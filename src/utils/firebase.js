import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  disableNetwork,
  setDoc,
} from "firebase/firestore";

import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../utils/ToastNotify";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (values, navigate, dispatch, clearLoading) => {
  const { firstname, lastname, email, password } = values;
  const displayName = `${firstname} ${lastname}`;
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    dispatch(clearLoading());
    navigate("/");
    toastSuccessNotify("Registered successfully!");
  } catch (error) {
    dispatch(clearLoading());
    toastErrorNotify(error.message);
  }
};

export const signIn = async (values, navigate, dispatch, clearLoading) => {
  const { email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    dispatch(clearLoading());
    toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    dispatch(clearLoading());
    toastErrorNotify(error.message);
  }
};

export const userObserver = (dispatch, createCurrentUser, clearCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      dispatch(createCurrentUser({ email, displayName, photoURL }));
    } else {
      dispatch(clearCurrentUser());
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      toastErrorNotify(error.message);
    });
};

export const forgotPassword = ({ email }, dispatch, clearLoading) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      dispatch(clearLoading());
      toastWarnNotify("Please check your mail box!");
    })
    .catch((err) => {
      dispatch(clearLoading());
      toastErrorNotify(err.message);
    });
};

export const db = getFirestore(app);

export const shoppingListenerFirebase = (dispatch, shoppingListener) => {
  const shoppingRef = collection(db, "shopping");
  onSnapshot(shoppingRef, (snapshot) => {
    dispatch(shoppingListener(snapshot.docs.map((doc) => ({ ...doc.data() }))));
  });
};

export const newShopping = (values) => {
  const ref = doc(db, "shopping", `${values.id}`);
  try {
    setDoc(ref, { ...values, piece: 1, currentUserList: [] });
    toastSuccessNotify("Added Successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};
export const deleteShopping = (id) => {
  try {
    deleteDoc(doc(db, "shopping", id.toString()));
    toastErrorNotify("Deleted Successfully");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

export const favoriteListenerFirebase = (dispatch, favoriteListener) => {
  const favoriteRef = collection(db, "favorite");
  onSnapshot(favoriteRef, (snapshot) => {
    dispatch(favoriteListener(snapshot.docs.map((doc) => ({ ...doc.data() }))));
  });
};

export const newFavorite = (values) => {
  const ref = doc(db, "favorite", `${values.id}`);
  try {
    setDoc(ref, { ...values, piece: 1, currentUserList: [] });
    toastSuccessNotify("Added Successfully!");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};
export const deleteFavorite = (id) => {
  try {
    deleteDoc(doc(db, "favorite", id.toString()));
    toastErrorNotify("Deleted Successfully");
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

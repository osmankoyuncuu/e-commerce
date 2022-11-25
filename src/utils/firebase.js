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
} from "firebase/firestore";

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

export const createUser = async (values, navigate, setLoading) => {
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
    setLoading(false);
    navigate("/");
    //toastSuccessNotify("Registered successfully!");
  } catch (error) {
    setLoading(false);
    //toastErrorNotify(error.message);
  }
};

export const signIn = async (values, navigate, setLoading) => {
  const { email, password } = values;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    setLoading(false);
    //toastSuccessNotify("Logged in successfully!");
  } catch (error) {
    setLoading(false);
    //toastErrorNotify(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
    } else {
      setCurrentUser(false);
    }
  });
};

export const logOut = () => {
  signOut(auth);
  //toastSuccessNotify("Logged out successfully!");
};

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
      //toastSuccessNotify("Logged in successfully!");
    })
    .catch((error) => {
      //toastErrorNotify(error.message);
    });
};

export const forgotPassword = ({ email }, setLoading) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      setLoading(false);
      //toastWarnNotify("Please check your mail box!");
    })
    .catch((err) => {
      setLoading(false);
      //toastErrorNotify(err.message);
    });
};

export const db = getFirestore(app);

const shoppingRef = collection(db, "shopping");
const currentRef = collection(db, "osman");

export const shoppingListenerFirebase = (dispatch, shoppingListener) => {
  onSnapshot(shoppingRef, (snapshot) => {
    dispatch(
      shoppingListener(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  });
};

export const newShopping = (values) => {
  try {
    addDoc(currentRef, { ...values });
  } catch (error) {
    console.log(error);
  }
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../component/Navbar";
import Favorite from "../pages/Favorite";
import Shopping from "../pages/Shopping";
import Detail from "../pages/Detail";
import Pay from "../pages/Pay";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../pages/Profile";
import Footer from "../component/Footer";
import PrivateRouter from "./PrivateRouter";
import { useEffect } from "react";
import { userObserver } from "../utils/firebase";
import { clearCurrentUser, createCurrentUser } from "../features/authSlice";
import {
  favoriteListenerFirebase,
  shoppingListenerFirebase,
} from "../utils/firebase";
import { filterShopping, shoppingListener } from "../features/shoppingSlice";
import { favoriteListener } from "../features/favoriteSlice";
import { getProduct } from "../features/productSlice";
import { filterFavorite } from "../features/favoriteSlice";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { favoriteList } = useSelector((state) => state.favorite);
  const { currentUser } = useSelector((state) => state.auth);
  const { shoppingList } = useSelector((state) => state.shopping);
  useEffect(() => {
    userObserver(dispatch, createCurrentUser, clearCurrentUser);
    favoriteListenerFirebase(dispatch, favoriteListener);
    shoppingListenerFirebase(dispatch, shoppingListener);
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    dispatch(
      filterFavorite(
        favoriteList.filter((item) =>
          item?.currentUserList.includes(currentUser?.email)
        )
      )
    );
  }, [favoriteList]);

  useEffect(() => {
    dispatch(
      filterShopping(
        shoppingList.filter((item) =>
          item?.currentUserList.includes(currentUser?.email)
        )
      )
    );
  }, [shoppingList]);

  return (
    <BrowserRouter>
      {true && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="detail/:id" element={<PrivateRouter />}>
          <Route path="" element={<Detail />} />
        </Route>
        <Route path="/favorite" element={<PrivateRouter />}>
          <Route path="" element={<Favorite />} />
        </Route>
        <Route path="/shopping" element={<PrivateRouter />}>
          <Route path="" element={<Shopping />} />
        </Route>
        <Route path="/pay" element={<PrivateRouter />}>
          <Route path="" element={<Pay />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;

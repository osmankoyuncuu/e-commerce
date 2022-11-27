import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../component/Navbar";
import Favorite from "../pages/Favorite";
import Shopping from "../pages/Shopping";
import Detail from "../pages/Detail";
import Pay from "../pages/Pay";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useSelector } from "react-redux";
import Profile from "../pages/Profile";
import Footer from "../component/Footer";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);
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

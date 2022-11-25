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

const AppRouter = () => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      {true && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

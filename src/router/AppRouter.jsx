import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../component/Navbar";
import Favorite from "../pages/Favorite";
import Shopping from "../pages/Shopping";
import Detail from "../pages/Detail";
import Pay from "../pages/Pay";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

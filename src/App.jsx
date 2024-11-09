import React from "react";
import Header from "./components/Header";
import AllRoutes from "./pages/AllRoutes";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateRoute from "./pages/CreateRoute";
import RouteFull from "./pages/RouteFull";
import Reviews from "./pages/Reviews";
import Favorites from "./pages/Favorites";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <>
      <Header />
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<AllRoutes />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/create" element={<CreateRoute />}></Route>
          <Route path="/route/:id" element={<RouteFull />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/Favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;

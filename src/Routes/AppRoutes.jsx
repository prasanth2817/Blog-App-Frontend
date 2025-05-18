import { Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "../Contexts/AuthContext";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Home from "../Pages/Home";

function AppRoutes() {
    const Navigate = useNavigate();
  const { authUser } = useAuthContext();
  return (
    <>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
        </Routes>
        <Toaster />
    </>
  );
}

export default AppRoutes;

import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-8">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

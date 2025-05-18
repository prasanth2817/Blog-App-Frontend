import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";

const Navbar = () => {
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("User-token");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-xl font-bold text-indigo-600">
          Blogify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/home" className="text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/my-blogs" className="text-gray-700 hover:text-indigo-600">
            My Blogs
          </Link>
          <Link to="/create-blog" className="text-gray-700 hover:text-indigo-600">
            Add Blog
          </Link>
          <button
            onClick={handleLogout}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/home" className="block text-gray-700 hover:text-indigo-600">
            Home
          </Link>
          <Link to="/my-blogs" className="block text-gray-700 hover:text-indigo-600">
            My Blogs
          </Link>
          <Link to="/create-blog" className="block text-gray-700 hover:text-indigo-600">
            Add Blog
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

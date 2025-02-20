import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import logo from "../assets/Logo.png";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="w-full px-12 py-2 mb-3 md:py-4 h-27 md:h-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={toggleTheme}
              className="p-2 bg-transparent border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer"
            >
              {theme === "light" ? (
                <IoSunny className="text-yellow-500" size={24} />
              ) : (
                <FaMoon className="text-gray-300" size={24} />
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex flex-col items-end">
                  <h2 className="text-sm">Welcome, {user.name}</h2>
                  <h2 className="text-sm">{user.email}</h2>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gray-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-green-500 px-4 py-2 rounded transition duration-200 hover:bg-green-600 text-center"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-500 px-4 py-2 rounded transition duration-200 hover:bg-purple-600 text-center"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

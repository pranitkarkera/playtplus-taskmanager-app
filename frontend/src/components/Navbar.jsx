// Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice"; // Import the logout action
import logo from "../assets/Logo.png"; // Import your logo
import { FaMoon } from "react-icons/fa"; // Import moon icon for dark theme
import { IoSunny } from "react-icons/io5"; // Import sun icon for light theme

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Get user from Redux state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light"); // Get theme from local storage

  // Effect to apply the theme and store it in local storage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login", { replace: true }); // Redirect to login page
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="w-full px-12 py-2 mb-3 md:py-4 h-27 md:h-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Side: Logo and Title */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 mr-2" />
            <h1 className="text-xl font-bold">Task Manager</h1>
          </div>

          {/* Right Side: Theme Toggle, Welcome Message, and Logout */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Theme Toggle Button */}
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
            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Container for Welcome Message and Email */}
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

import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex space-x-7">
            {/* Logo or Brand Name */}
            <div className="flex items-center">
              <span className="font-semibold text-white text-2xl">
                PasteBin
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-700 text-white shadow-md"
                      : "text-white hover:bg-purple-500 hover:text-white"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/pastes"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-purple-700 text-white shadow-md"
                      : "text-white hover:bg-purple-500 hover:text-white"
                  }`
                }
              >
                Pastes
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;``
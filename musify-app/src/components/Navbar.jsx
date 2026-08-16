import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full flex justify-between items-center font-semibold">

      {/* Left side - Navigation buttons */}
      <div className="flex items-center gap-2">

        {/* Back button */}
        <div 
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors">
          <ChevronLeft className="w-4 h-4 text-white" />
        </div>

        {/* Forward button */}
        <div
          onClick={() => navigate(1)}
          className="w-8 h-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition-colors">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">

        {/* Explore Premium */}
        <p className="bg-white text-black text-[15px] px-4 py-1 cursor-pointer rounded-2xl hidden md:block">
          Explore Premium
        </p>

        {/* User */}
        <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-2xl">
          <User className="w-4 h-4 text-white" />

          <span className="text-white text-sm hidden sm:inline">
            {user?.email?.split("@")[0]}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] cursor-pointer transition-colors flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />

          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>

    </div>
  );
};

export default Navbar;
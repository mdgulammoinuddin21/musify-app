import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Menu, X, User, LogOut } from "lucide-react";
import { assets } from "../assets/assets.js";
import { SIDE_MENU_DATA } from "../assets/assets.js";
import toast from "react-hot-toast";
import Sidebar from "./Sidebar.jsx";


const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful!");
    navigate("/login");
  };

  return (
    <>
      {/* Navbar */}
      <div className="h-[61px] w-full bg-white border-b border-gray-200/50 px-4 sm:px-6 lg:px-7 flex items-center justify-between sticky top-0 z-30">
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Menu button - mobile + tablet */}
          <button
            onClick={() => setOpenSideMenu((prev) => !prev)}
            className="lg:hidden flex items-center justify-center p-2 rounded-md text-black hover:bg-gray-100 transition"
          >
            {openSideMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className="w-10 h-10" />

            <span className="text-xl sm:text-2xl font-bold text-black truncate">
              Musify
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <User className="w-4 h-4 text-gray-600" />

            <span className="text-sm font-medium text-gray-700 max-w-[180px] truncate">
              {user?.email}
            </span>

            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {user?.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />

            <span className="hidden sm:inline text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile + Tablet Sidebar */}
      {openSideMenu && (
        <div className="lg:hidden fixed top-[61px] left-0 right-0 z-20 bg-white shadow-lg border-b border-gray-200 max-h-[calc(100vh-61px)] overflow-y-auto">
          <Sidebar onItemClick={() => setOpenSideMenu(false)} />
        </div>
      )}
    </>
  );
};

export default Navbar;

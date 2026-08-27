import { SIDE_MENU_DATA } from "../assets/assets.js";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (path) => {
    navigate(path);

    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="w-full lg:w-64 bg-white border-r border-gray-200/50 p-5">
      {SIDE_MENU_DATA.map((item, index) => {
        const Icon = item.icon;

        // Check current URL
        const isActive = location.pathname === item.path;

        return (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4
              text-[15px]
              py-3 px-6
              rounded-lg
              mb-3
              transition-all duration-200
              ${
                isActive
                  ? "bg-[#3be477] text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <Icon className="w-5 h-5 shrink-0" />

            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;

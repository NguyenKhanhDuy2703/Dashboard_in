import { useState, useRef, useEffect } from 'react';
import {
  Home,
  User,
  BarChart2,
  Bell,
  Settings,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {logout} from "../../services/auth.services"
import FloatingLoader from './loading';

// Danh sách menu
const menuItems = [
  { icon: <Home size={18} />, label: "Dashboard", path: "/" },
  { icon: <User size={18} />, label: "Staff", path: "/staff" },
  { icon: <BarChart2 size={18} />, label: "Payroll attendance", path: "/payroll-attendance" },
  { icon: <Briefcase size={18} />, label: "Departments", path: "/department-job-titles" },
  { icon: <Bell size={18} />, label: "Notifications", path: "/notifications" },
  { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
];

export default function Header( {user}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activePath, setActivePath] = useState("/");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const handleNavigate = (path) => {
    setActivePath(path);
    navigate(path);

  };
 
  const handleLogout = async() => {
    try {
      const response = await logout();
      if (response.status === 200) {
        navigate("/auth/login");
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } 
    
    
  };
 
  return (
    <div className="w-full  shadow-sm bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600" onClick={() => handleNavigate("/")}>
          HR Dashboard
        </div>

        {/* Menu navigation - fixed positioning and highlighting */}
        <div className="flex items-center bg-blue-50 rounded-lg">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center space-x-2 py-2 px-4 text-sm rounded-lg transition-colors ${
                activePath === item.path
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* User profile with notifications */}
        <div className="flex items-center space-x-4">
          {/* Notification bell */}
          <div className="relative">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={() => console.log("Notifications clicked")}
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center space-x-2 bg-gray-50 py-1 px-3 rounded-full hover:bg-gray-100"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="font-medium text-gray-800">{user?.user || "User"}</span>
                <span className="text-xs text-gray-500">{user?.role || "User"}</span>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-medium">Signed in as</p>
                  <p className="truncate">{user?.user}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigate("/profile")}
                >
                  Your Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleNavigate("/settings")}
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Outlet } from "react-router-dom";

import AuthImage from "../assets/authImage.png"
// AuthLayout Component (Parent)
const AuthLayout = () => {
  // In a real application, you would import this image
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl flex overflow-hidden">
        {/* Left - Content Area (where Login will be rendered via Outlet) */}
        <div className="w-full md:w-1/2 p-8">
          <Outlet />
        </div>
        
        {/* Right - Image (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-blue-50">
          <img
            src={AuthImage}
            alt="Authentication Image"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
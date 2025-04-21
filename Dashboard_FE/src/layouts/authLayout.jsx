import { Outlet } from "react-router-dom";
import AuthImages from "../assets/authImage.jpg";


const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-white text-black rounded-2xl shadow-2xl w-full max-w-5xl flex overflow-hidden border border-blue-500 p-4">
        {/* Left - Login Form */}
        <div className="w-full md:w-2/3 p-6 md:p-10">
          <Outlet  />
        </div>

        {/* Right - Image (hidden on small screens) */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-white p-6">
          <img
            src={AuthImages}
            alt="HR Payroll Diagram"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

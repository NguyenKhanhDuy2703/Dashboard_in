import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-full p-10 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back!
          </h2>
          <h3 className="text-lg font-medium text-gray-600">Please Sign In</h3>
        </div>
        <button className="text-blue-600 border border-blue-600 px-4 py-1 rounded-md hover:bg-blue-50 transition text-sm">
          Sign Up
        </button>
      </div>

      <form>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="********"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-[36px] right-3 text-gray-500"
          >
            {showPassword ? (
              <FaRegEye className="w-5 h-5" />
            ) : (
              <FaRegEyeSlash className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            I forgot my password
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;

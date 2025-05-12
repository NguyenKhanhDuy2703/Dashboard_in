import { useState } from "react";
import {
  FaRegEyeSlash,
  FaRegEye,
  FaEnvelope,
  FaLock,
  FaFingerprint,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    const fectchLogin = async () => {
      try {
        const response = await login({ email, password });
        console.log(response);
        if (response.status === 200) {
          toast.success("Login successful!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else if (response.status === 401) {
          toast.error("Invalid email or password.");
        } else if (response.status === 500) {
          toast.error("your account not authorized");
        }
      } catch (error) {
        toast.error(error.message, " Please try again.");
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };
    fectchLogin();
  };

  return (
    <>
      {/* Header */}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>
        <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
          <FaFingerprint className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      {/* Login Form */}
      <div className="mt-8">
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MdOutlineEmail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaRegEyeSlash className="h-5 w-5" />
                ) : (
                  <FaRegEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold 
    hover:opacity-90 transition-opacity duration-300 
    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <span className="text-gray-600 text-sm">
              Don't have an account?{" "}
            </span>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:text-blue-800 hover:underline"
            >
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

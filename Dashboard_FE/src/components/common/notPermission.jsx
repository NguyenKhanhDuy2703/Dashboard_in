import React, { useState } from 'react';
import { ShieldOff, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccessDeniedPage = () => {
  const [isRotating, setIsRotating] = useState(false);
  const navigate = useNavigate();
  const handleGoBack = () => {
   setTimeout(() => {
        navigate("/");
     }, 1000);
  };

  const handleRetry = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <div className="flex justify-center mb-6">
          <div className={`${isRotating ? 'animate-spin' : ''}`}>
            <ShieldOff 
              className="text-red-500 opacity-80" 
              size={100} 
              strokeWidth={1.5}
            />
          </div>
        </div>
        <div className="text-6xl font-bold text-red-500 mb-4 animate-pulse">
          403
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          You do not have permission to access this page. 
          Please contact the administrator if you believe this is an error.
        </p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleGoBack}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <span>Go Back</span>
          </button>
          <button 
            onClick={handleRetry}
            className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2 ${isRotating ? 'cursor-not-allowed opacity-50' : ''}`}
            disabled={isRotating}
          >
            <RefreshCw 
              size={20} 
              className={isRotating ? 'animate-spin' : ''}
            />
            <span>Retry</span>
          </button>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-30 animate-blob"></div>
          <div className="absolute top-1/3 right-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

// Custom CSS for additional animations
const customStyles = `
@keyframes blob {
  0% {
    transform: scale(1) translate(0, 0);
  }
  33% {
    transform: scale(1.1) translate(-10px, 10px);
  }
  66% {
    transform: scale(0.9) translate(10px, -10px);
  }
  100% {
    transform: scale(1) translate(0, 0);
  }
}

.animate-blob {
  animation: blob 10s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;

// Inject custom styles
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = customStyles
document.head.appendChild(styleSheet)

export default AccessDeniedPage;
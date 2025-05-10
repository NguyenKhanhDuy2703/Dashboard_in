import React from "react";

const FloatingLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative flex items-center justify-center">
        {/* Sóng lan tỏa */}
        <div className="absolute w-14 h-14 bg-blue-500 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute w-20 h-20 bg-blue-400 rounded-full opacity-30 animate-ping delay-150"></div>

        {/* Vòng xoay */}
        <div className="w-10 h-10 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default FloatingLoader;

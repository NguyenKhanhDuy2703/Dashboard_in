import React from "react";
import { FiSearch } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";

const StaffHeader = () => {
const navigate = useNavigate();
  return (
    <div className="p-6 rounded-lg flex items-center justify-between gap-6 bg-white shadow-lg">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search staff"
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Staff Count */}
      <div className="text-center">
        <p className="text-2xl font-semibold text-gray-800">250</p>
        <p className="text-sm text-gray-500">Total number of staff</p>
      </div>

      {/* Filter Dropdown */}
      <div className="w-1/4">
        <select className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>All staff</option>
          <option>Active staff</option>
          <option>Inactive staff</option>
        </select>
      </div>

      {/* Add New Staff Button */}
      <button 
      className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white px-6 py-2 
      rounded-md font-medium hover:opacity-90 transition duration-300"
      onClick={() => {setTimeout(()=>{navigate("/add-staff")}, 1000)}}>
        Add New Staff
      </button>
    </div>
  );
};

export default StaffHeader;

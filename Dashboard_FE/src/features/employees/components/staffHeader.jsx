import { useState, useEffect } from "react";
import { FiSearch, FiUsers, FiFilter, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const StaffHeader = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [staffCount, setStaffCount] = useState(0);
  const [filter, setFilter] = useState("all");
 const employee = useSelector((state) => state.employees);
 
  // Simulating staff count update on filter change
  useEffect(() => {
   setStaffCount(employee.total)
  },[employee]);

  const handleAddStaff = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/add-staff");
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="p-6 rounded-lg bg-white shadow-lg border border-gray-100">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input with Animation */}
        <div className="flex items-center gap-3 w-full lg:w-1/3">
          <div className="relative w-full group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pl-10 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 ease-in-out"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 
              group-hover:text-blue-500 transition-colors duration-300" size={18} />
          </div>
        </div>

        {/* Staff Count Card */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-100 
          shadow-sm w-full lg:w-auto text-center">
          <div className="flex items-center justify-center gap-2">
            <FiUsers className="text-blue-600" size={20} />
            <p className="text-2xl font-bold text-gray-800">{staffCount}</p>
          </div>
          <p className="text-sm text-gray-600 font-medium">Total staff members</p>
        </div>

        {/* Filter Dropdown */}
        <div className="w-full lg:w-1/4">
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white 
                appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent pr-10 transition-all duration-300 ease-in-out"
            >
              <option value="all">All staff</option>
              <option value="active">Active staff</option>
              <option value="inactive">Inactive staff</option>
            </select>
            <FiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
          </div>
        </div>

        {/* Add New Staff Button */}
        <button
          disabled={isLoading}
          onClick={handleAddStaff}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 
            rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300
            w-full lg:w-auto flex items-center justify-center gap-2 shadow-md hover:shadow-lg
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : (
            <FiUserPlus size={18} />
          )}
          Add New Staff
        </button>
      </div>
    </div>
  );
};

export default StaffHeader;
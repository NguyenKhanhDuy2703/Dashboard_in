import { useState } from "react";
import PayrollTabs from "../components/PayrollTabs";
import PayrollView from "../components/ViewPayroll";
import AttendanceRecord from "../components/AttendenceRecord";
import ViewPayrollHistory from "../components/ViewHistoryPayroll";

const PayrollAttendanceLayout = () => {
  const [activeTab, setActiveTab] = useState("Payroll");
  const currentDate = new Date();
  const monthYear = currentDate.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Payroll":
        return <PayrollView />;
      case "Salary history":
        return <ViewPayrollHistory />;
      case "Attendance records":
        return <AttendanceRecord />;
      default:
        return <PayrollView />;
    }
  };

  // Get the appropriate title for the current active tab
  const getActiveTabTitle = () => {
    switch (activeTab) {
      case "Payroll":
        return "Payroll Management";
      case "Salary history":
        return "Salary History";
      case "Attendance records":
        return "Attendance Records";
      default:
        return "Payroll Management";
    }
  };

  // Get the appropriate description for the current active tab
  const getActiveTabDescription = () => {
    switch (activeTab) {
      case "Payroll":
        return "View and manage employee payroll data and payment information";
      case "Salary history":
        return "Track employee salary changes and payment history over time";
      case "Attendance records":
        return "Monitor employee check-ins, leaves, and attendance status";
      default:
        return "View and manage employee payroll data and payment information";
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-50">
      <div className="w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Card with Stats */}
        <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  Payroll & Attendance Management
                </h1>
                <p className="text-indigo-100 mt-2 text-sm sm:text-base">
                  Manage employee payroll, salary history, and attendance
                  records
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block bg-white bg-opacity-30 backdrop-blur-md rounded-xl py-2 px-4 shadow-md">
                  <div className="text-xs text-slate-700 uppercase font-semibold">
                    Month
                  </div>
                  <div className="text-gray-900 text-lg font-bold">
                    {monthYear}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Current Tab Context */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {getActiveTabTitle()}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {getActiveTabDescription()}
                </p>
              </div>
              <div className="mt-3 sm:mt-0">
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {activeTab === "Payroll" && "Process Payroll"}
                    {activeTab === "Salary history" && "Export History"}
                    {activeTab === "Attendance records" && "Record Attendance"}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Tabs Navigation */}
          <div className="border-b border-gray-200 bg-white">
            <PayrollTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Content Section with better padding and focus */}
          <div className="p-6 bg-white">
            <div className="bg-white rounded-md">{renderTabContent()}</div>
          </div>

          {/* Enhanced Footer Section */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 mb-2 sm:mb-0">
                Last updated: {new Date().toLocaleDateString()} • HR Management
                System
              </p>
              <div className="flex space-x-4">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Help
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Report Issue
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollAttendanceLayout;

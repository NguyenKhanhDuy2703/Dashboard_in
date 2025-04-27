import { useState } from "react";
import PayrollTabs from "../components/PayrollTabs";
import PayrollView from "../components/ViewPayroll";
import AttendanceRecord from "../components/Attendence record";
import ViewPayrollHistory from "../components/ViewHistoryPayroll";

const PayrollAttendanceLayout = () => {
  const [activeTab, setActiveTab] = useState("Payroll");

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-700 p-6">
            <h1 className="text-2xl font-bold text-white">
              Payroll & Attendance Management
            </h1>
            <p className="text-indigo-200 mt-1">
              Manage employee payroll, salary history, and attendance records
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <PayrollTabs activeTab={activeTab} onTabChange={handleTabChange} />
          </div>

          {/* Content Section */}
          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: {new Date().toLocaleDateString()} • HR Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollAttendanceLayout;
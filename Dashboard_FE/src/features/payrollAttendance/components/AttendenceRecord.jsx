import { useEffect, useState } from "react";
import {  FileText, Download} from "lucide-react";
import FloatingLoader from "../../../components/common/loading";
import {getAttendance} from "../../../services/payroll.service"
import Pagination from "../../../components/common/Pagination";
export default function AttendanceRecord() {
  
const [adttendanceData, setAttendanceData] = useState([])
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(0);
const onPageChange = (page) => {
  const fetchAttendanceData = async () => {
    setLoading(true);
    try {
      const response = await getAttendance({page , limit: 20});
      setAttendanceData(response.attendance.attendance);
      setTotalPages(response.attendance.totalPages);
      setPage(response.attendance.currentPage);
      console.log("response", response);
      
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }finally {
      setLoading(false);
    }
  };
  fetchAttendanceData();
}
useEffect ( () => {
  setLoading(true);
  const fetchAttendanceData = async () => {
    try {
      const response = await getAttendance({page , limit: 20});
      console.log("response", response.attendance);
      setAttendanceData(response.attendance.attendance);
      setTotalPages(response.attendance.totalPages);
      setPage(response.attendance.currentPage);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      setLoading(false);
    }finally {
      setLoading(false);
    }
  };
  fetchAttendanceData();
},[])
 if (loading || !adttendanceData) {
    return (
      <FloatingLoader />
    );
  }
  return (
    <div className="p-6 bg-gray-50 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Records</h1>
          <p className="text-sm text-gray-500 mt-1">Track employee attendance and leave status</p>
        </div>
        
      </div>  
      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Employee Attendance Details</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "fullName", label: "Full Name" },
                  { key: "department", label: "Department" },
                  { key: "position", label: "Position" },
                  { key: "workingDays", label: "Working Days" },
                  { key: "absences", label: "Absences" },
                  { key: "leaveDays", label: "Leave Days" },
                  { key: "status", label: "Status" }
                ].map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adttendanceData?.length > 0 ? (
                adttendanceData?.map((employee) => (
                  <tr key={employee.id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">#{employee.EmployeeID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                       
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{employee.FullName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.DepartmentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.PositionName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.WorkDays}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-red-600 font-medium">{employee.AbsentDays}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.LeaveDays}</td>
                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.AttendanceMonth}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2.5 py-1 rounded-full text-xs font-medium
                          ${employee.status === "Working" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {employee.Status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination  currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}  className="mt-4"/>
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
          <Download size={18} />
          Export Excel
        </button>
        <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">
          <FileText size={18} />
          Export PDF
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition ml-auto">
          Print Attendance
        </button>
      </div>
    </div>
  );
}
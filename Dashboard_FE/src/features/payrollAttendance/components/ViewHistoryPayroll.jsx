import { useEffect, useState } from "react";
import { Search, FileText, Download } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayrolls } from "../payrollSlice";
import FloatingLoader from "../../../components/common/loading";
import Pagination from "../../../components/common/Pagination";
import exportToExcel from "../../../utils/exportExcel";



const availableMonths = [
  { label: "All", value: null },
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 }
];


export default function ViewPayrollHistory() {
   const [displayData, setDisplayData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

const dispatch = useDispatch();

const { payrolls, currentPage, totalPages, pageSize, loading } = useSelector((state) => state.payroll);

const onPageChange = (page) => {
const fetchData = async () => {
  try {
    await dispatch(fetchPayrolls({ page: page , monthSalary: null}));
    setDisplayData(payrolls);
  } catch (error) {
    console.error("Error fetching payroll data:", error);
  }
}
  fetchData();
};
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    const fetchData = async () => {
      try {
       await dispatch(fetchPayrolls({ page: 1, monthSalary: month }));
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };
    fetchData();
  };
useEffect(() => {
  const fetchData = async () => {
    try {
      await dispatch(fetchPayrolls({ page: currentPage , monthSalary: null}));
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  fetchData();
},[dispatch, currentPage, pageSize ]);
useEffect(() => {
  setDisplayData(payrolls);
}, [payrolls]);
    
if (loading) {
    return (
      <FloatingLoader />
    );
  }
  return (
    <>
      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search employee..."
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <label htmlFor="month-select" className="text-gray-600 font-medium whitespace-nowrap">
            Salary Month:
          </label>
          <select 
            id="month-select"
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {availableMonths.map((month) => (
              <option key={month.label} value={month.value}>{month.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section - Enhanced */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Employee Payroll Details</h3>
          <p className="text-sm text-gray-500">{selectedMonth} Pay Period</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "fullName", label: "Full Name" },
                  { key: "dept", label: "Department" },
                  { key: "position", label: "Position" },
                  { key: "salaryMonth", label: "Salary Month" },
                  { key: "baseSalary", label: "Base Salary" },
                  { key: "bonus", label: "Bonus" },
                  { key: "netSalary", label: "Net Salary" },
                  { key: "deduction", label: "Deduction" },
                  { key: "action", label: "Action" }
                ].map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.key !== "action" ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-center">
                      {column.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.length > 0 ? (
                displayData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">#{row.EmployeeID}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{row.FullName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.DepartmentName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.PositionName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.SalaryMonth}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${row.BaseSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${row.Bonus.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${row.NetSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">${row.Deductions.toLocaleString()}</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900 font-medium">Edit</button>
                        <span className="text-gray-300">|</span>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-6 py-4 text-center text-sm text-gray-500">
                    No payroll records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mt-4"
      />

      {/* Export Actions - Enhanced */}
      <div className="flex flex-wrap gap-3 mt-6">
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-indigo-700 transition">
          <Download size={18}
          onClick={ () => exportToExcel(displayData)}
          />
          Export Excel
        </button>
        <button className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-red-700 transition">
          <FileText size={18} />
          Export PDF
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg shadow hover:bg-gray-50 transition">
          Email Reports
        </button>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg shadow hover:bg-gray-50 transition ml-auto">
          Print Payroll
        </button>
      </div>
    </>
  );
}
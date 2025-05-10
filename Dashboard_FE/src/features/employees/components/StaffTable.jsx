import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, setPage } from "../employeeSlice";
import Pagination from "../../../components/common/Pagination";
import {deleteEmployee} from "../../../services/employee.sevices"
import { toast } from "react-toastify";
import FloatingLoader from "../../../components/common/loading";
const StaffTable = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const menuRefs = useRef([]);
  const dispatch = useDispatch();
  const [loading , setLoading] = useState(false);

  const { employees = [], page, totalPage } = useSelector((state) => state.employees);

  const handlePageChange = async (newPage) => {
    try {
      const res = await dispatch(fetchEmployees({ page: newPage, limit: 20 }));
      if (res.error) {
        console.error("Failed to fetch employees:", res.error);
      } else {
        dispatch(setPage(newPage));
      }
    } catch (error) {
      console.error("Failed to fetch staff data:", error);
    }
  };

  useEffect(() => {
    handlePageChange(1);
  }, [dispatch]);

  const toggleMenu = (index) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeMenuIndex !== null &&
        menuRefs.current?.[activeMenuIndex] &&
        !menuRefs.current[activeMenuIndex].contains(event.target)
      ) {
        setActiveMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenuIndex]);
  /// delete nhan vien 
  const handleDelete = async (EmployeeID) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    setLoading(true);
    try {
      const res = await deleteEmployee(EmployeeID);
      
      if (res.status === 200) {
        toast.success("Delete employee successfully");
        await dispatch(fetchEmployees({ page, limit: 20 }));
      }
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }finally
    {
      setLoading(false);
    }
  };
  if(loading) { 
    return (
        <FloatingLoader />
    )
  }else{
  return (
    <div className="bg-white rounded-xl shadow-sm w-full relative p-5">
      <div className="overflow-x-auto rounded-md border border-gray-200 relative">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-blue-700 font-medium">
            <tr>
              {[
                "ID",
                "Full Name",
                "Date of Birth",
                "Gender",
                "Hire Date",
                "Email",
                "Phone Number",
                "Position",
                "Department",
                "Status",
                "Action",
              ].map((title, idx) => (
                <th key={idx} className="px-4 py-3 text-left whitespace-nowrap">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employees) &&
              employees.map((staff, index) => (
                <tr
                  key={staff.EmployeeID}
                  className="border-t border-gray-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-4 py-2">{staff.EmployeeID}</td>
                  <td className="px-4 py-2">{staff.FullName}</td>
                  <td className="px-4 py-2">{staff.DateOfBirth}</td>
                  <td className="px-4 py-2">{staff.Gender}</td>
                  <td className="px-4 py-2">{staff.HireDate}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{staff.Email}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{staff.PhoneNumber}</td>
                  <td className="px-4 py-2">{staff.Position}</td>
                  <td className="px-4 py-2">{staff.Department}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                      {staff.Status}
                    </span>
                  </td>
                  <td className="px-4 py-2 relative">
                    <div
                      ref={(el) => (menuRefs.current[index] = el)}
                      className="relative"
                    >
                      <button
                        className="text-blue-600 hover:underline text-sm font-medium"
                        onClick={() => toggleMenu(index)}
                      >
                        More
                      </button>
                      {activeMenuIndex === index && (
                        <div className="absolute bottom-0 right-0 transform translate-y-full bg-white border border-gray-200 rounded-md shadow-lg w-32 z-20">
                          <ul className="text-sm text-gray-700">
                            <li>
                              <Link
                                to={`/edit-staff/${staff.EmployeeID}`}
                                className="block px-4 py-2 hover:bg-blue-50 cursor-pointer"
                              >
                                Edit
                              </Link>
                            </li>
                            <button className="px-4 py-2 hover:bg-blue-50 cursor-pointer" onClick={()=> handleDelete(staff.EmployeeID)}>
                              Delete
                            </button>
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
}
export default StaffTable;

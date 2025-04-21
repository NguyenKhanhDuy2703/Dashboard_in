import { useState } from "react";
import { Link } from "react-router-dom";

const staffData = Array(8).fill({
  id: "01",
  fullName: "Sandra",
  dob: "10/04/2004",
  gender: "Female",
  hireDate: "10/04/2004",
  email: "Example@gmail.com",
  phone: "081300000000",
  position: "Admin",
  department: "Human Resources",
  status: "Working",
});

const StaffTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setActiveMenuIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">All Staff</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Showing</span>
          <input
            type="number"
            className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          />
          <span>per page</span>
        </div>
      </div>

      {/* Table */}
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
            {staffData.map((staff, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-blue-50 transition-colors relative"
              >
                <td className="px-4 py-2">{staff.id}</td>
                <td className="px-4 py-2">{staff.fullName}</td>
                <td className="px-4 py-2">{staff.dob}</td>
                <td className="px-4 py-2">{staff.gender}</td>
                <td className="px-4 py-2">{staff.hireDate}</td>
                <td className="px-4 py-2 whitespace-nowrap">{staff.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{staff.phone}</td>
                <td className="px-4 py-2">{staff.position}</td>
                <td className="px-4 py-2">{staff.department}</td>
                <td className="px-4 py-2">
                  <span className="inline-block text-green-700 text-xs bg-green-100 px-2 py-0.5 rounded-full">
                    {staff.status}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline text-sm font-medium"
                    onClick={() => toggleMenu(index)}
                  >
                    More
                  </button>
                  {activeMenuIndex === index && (
                    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-32 z-20">
                      <ul className="text-sm text-gray-700">
                        <Link to={"/edit-staff"} className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Edit</Link>
                        <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">Delete</li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex justify-end items-center gap-2 text-sm">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-100 transition"
          >
            {page}
          </button>
        ))}
        <button className="px-3 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-100 transition">
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default StaffTable

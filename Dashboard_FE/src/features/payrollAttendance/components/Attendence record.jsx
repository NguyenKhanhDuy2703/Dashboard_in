// Dữ liệu giả lập
const attendanceData = Array.from({ length: 7 }).map((_, i) => ({
  id: `${i + 101}`,
  fullName: i === 0 ? "Managing Director" : `Employee ${i + 1}`,
  position: i === 0 ? "MD/CEO" : ["Manager", "Developer", "HR", "Accountant", "Designer", "Analyst"][i % 6],
  workingDays: 20 - Math.floor(Math.random() * 3),
  absences: Math.floor(Math.random() * 5),
  leaveDays: Math.floor(Math.random() * 4),
  status: Math.random() > 0.2 ? "Working" : "On leave",
}));

export default function AttendanceRecord() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Full Name", "Position", "Working Days", "Absences", "Leave Days", "Status"].map((header) => (
                <th key={header} className="p-3 text-sm font-semibold text-gray-700 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceData.map((row) => (
              <tr key={row.id} className="hover:bg-indigo-50 transition-colors">
                <td className="p-3 text-sm text-gray-700">{row.id}</td>
                <td className="p-3 text-sm font-medium text-gray-800">{row.fullName}</td>
                <td className="p-3 text-sm text-gray-700">{row.position}</td>
                <td className="p-3 text-sm text-gray-700">{row.workingDays}</td>
                <td className="p-3 text-sm text-gray-700">{row.absences}</td>
                <td className="p-3 text-sm text-gray-700">{row.leaveDays}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === "Working"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

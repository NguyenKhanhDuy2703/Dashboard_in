
const payrollData = Array.from({ length: 8 }).map((_, i) => ({
  id: `P${i + 101}`,
  fullName: `Staff ${i + 1}`,
  dept: ["Executive", "IT", "HR", "Finance", "Design", "Operations"][i % 6],
  position: ["Manager", "Developer", "HR Specialist", "Accountant", "Designer", "Analyst"][i % 6],
  salaryMonth: "April 2025",
  baseSalary: 40000 + (i * 2500),
  bonus: 20000 - (i * 1000),
  netSalary: 55000 + (i * 1500),
  deduction: 5000 - (i * 200),
}));

export default function ViewPayrollHistory() {
  return (
    <>
      <div className="flex justify-end mb-4">
        <span className="text-sm text-gray-500">
          👥 {payrollData.length} Total staff
        </span>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-indigo-100 text-indigo-800">
            <tr>
              {[
                "ID",
                "Full Name",
                "Department",
                "Position",
                "Salary Month",
                "Base Salary",
                "Bonus",
                "Net Salary",
                "Deduction",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="p-3 text-sm font-semibold border-b border-gray-200 text-left"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payrollData.map((row, idx) => (
              <tr
                key={idx}
                className="even:bg-gray-50 hover:bg-indigo-50 transition"
              >
                <td className="p-3 border-b border-gray-200">{row.id}</td>
                <td className="p-3 border-b border-gray-200">{row.fullName}</td>
                <td className="p-3 border-b border-gray-200">{row.dept}</td>
                <td className="p-3 border-b border-gray-200">{row.position}</td>
                <td className="p-3 border-b border-gray-200">{row.salaryMonth}</td>
                <td className="p-3 border-b border-gray-200">{row.baseSalary.toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200">{row.bonus.toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200">{row.netSalary.toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200">{row.deduction.toLocaleString()}</td>
                <td className="p-3 border-b border-gray-200 text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

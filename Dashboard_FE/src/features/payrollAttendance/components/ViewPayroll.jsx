
const sampleData = Array.from({ length: 8 }).map((_, i) => ({
  id: `0${i + 1}`,
  fullName: `Staff ${i + 1}`,
  dept: "MD/CEO",
  position: "IT",
  salaryMonth: "April 2025",
  baseSalary: 40000,
  bonus: 20000,
  netSalary: 55000,
  deduction: 5000,
}));

export default function ViewPayroll() {

  const displayData = sampleData;

  return (
    <>

      <div className="overflow-x-auto bg-white shadow rounded-md">
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
            {displayData.map((row, idx) => (
              <tr
                key={idx}
                className="even:bg-gray-50 hover:bg-indigo-50 transition"
              >
                <td className="p-3 border-b border-gray-200">{row.id}</td>
                <td className="p-3 border-b border-gray-200">{row.fullName}</td>
                <td className="p-3 border-b border-gray-200">{row.dept}</td>
                <td className="p-3 border-b border-gray-200">{row.position}</td>
                <td className="p-3 border-b border-gray-200">
                  {row.salaryMonth}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {row.baseSalary.toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {row.bonus.toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {row.netSalary.toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-200">
                  {row.deduction.toLocaleString()}
                </td>
                <td className="p-3 border-b border-gray-200 text-indigo-600 font-semibold cursor-pointer hover:underline">
                  Edit
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-md shadow hover:bg-indigo-700 transition">
          📄 Export Excel/PDF
        </button>
  
      </div>
    </>
  );
}
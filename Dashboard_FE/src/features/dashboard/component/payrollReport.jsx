import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import numeral from "numeral";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];
const PayrollReport = ({ salaryDepartment, salaryMonth }) => {
  const departmentData = salaryDepartment.map((department, index) => ({
    name: department.DepartmentName,
    value: Number(department.AVGSalary),
    color: COLORS[index % COLORS.length],
  }));
  const salaryData = salaryMonth.map((salary) => ({
    month: new Date(salary.SalaryMonth).toLocaleString("en-US", {
      month: "long",
    }),
    baseSalary: Number(salary.TotalBaseSalary),
    bonus: Number(salary.TotalBonus),
    deductions: Number(salary.TotalDeduction),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Salary Components */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Salary Components
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={salaryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) =>
                numeral(value).format("0a").toUpperCase()
              }
            />
            <Tooltip
              formatter={(value) => [
                numeral(value).format("0.00a").toUpperCase(),
                "",
              ]}
            />
            <Legend />
            <Bar
              dataKey="baseSalary"
              name="Base Salary"
              stackId="a"
              fill="#38bdf8"
            />
            <Bar dataKey="bonus" name="Bonus" stackId="a" fill="#4ade80" />
            <Bar
              dataKey="deductions"
              name="Deductions"
              stackId="a"
              fill="#ef4444"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Department Payroll Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Department Payroll Breakdown
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Export
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={departmentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                `${numeral(value).format("0.00a").toUpperCase()}`,
                "Payroll",
              ]}
            />
            <Legend
              formatter={(value) => {
                const found = departmentData.find(
                  (item) => item.name === value
                );
                return `${value} (${numeral(found?.value)
                  .format("0.00a")
                  .toUpperCase()})`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PayrollReport;

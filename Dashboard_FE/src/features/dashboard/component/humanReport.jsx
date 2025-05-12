
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
  
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

const HumanReport = ({departments , positions , status , attendanceMonth}) => {
const departmentData = departments.map((department , index) => ({   
    name: department.DepartmentName,
    value: Number(department.EmployeeCount),
    color: COLORS[index % COLORS.length]
    }));
const positionData = positions.map((position ) => ({
    name: position.PositionName,
    count: Number(position.EmployeeCount),
    }));
const attendanceData = attendanceMonth.map((attendance) => ({
    month: new Date(attendance.AttendanceMonth).toLocaleString('en-US', { month: 'long' }),
    workDays: Number(attendance.TotalWorkDays),
    absentDays: Number(attendance.TotalAbsentDays),
    leaveDays: Number(attendance.TotalLeaveDays),
    }));
   return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Distribution by Department */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Employee Distribution by Department</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
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
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Positions Distribution */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Position Distribution</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={positionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`${value} employees`, 'Count']} />
                  <Bar dataKey="count" name="Employees" fill="#4ade80" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Employee Status */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Employee Status</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500">{status[0].Status === "Active"  ? status[0].EmployeeCount : 0}</div>
                  <div className="text-sm text-gray-500 mt-1">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500">{status[0].Status === "OnLeave"  ?  status[0].EmployeeCount : 0}</div>
                  <div className="text-sm text-gray-500 mt-1">On Leave</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500">{status[0].Status === "NewHire"  ?  status[0].EmployeeCount : 0}</div>
                  <div className="text-sm text-gray-500 mt-1">New Hires</div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Status Distribution</h4>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87.5%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>87.5% Active</span>
                  <span>12.5% Inactive</span>
                </div>
              </div>
            </div>

            {/* Attendance Overview */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Attendance Overview</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="workDays" name="Work Days" stroke="#38bdf8" strokeWidth={2} />
                  <Line type="monotone" dataKey="absentDays" name="Absent Days" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="leaveDays" name="Leave Days" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
}
export default HumanReport;
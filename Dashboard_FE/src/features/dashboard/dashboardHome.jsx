import { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('human');
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [dateRange, setDateRange] = useState('monthly');
  
  // Mock data for employee distribution by department
  const departmentData = [
    { name: 'IT', value: 85, color: '#38bdf8' },
    { name: 'HR', value: 40, color: '#4ade80' },
    { name: 'Finance', value: 35, color: '#fcd34d' },
    { name: 'Marketing', value: 65, color: '#fb7185' },
    { name: 'Operations', value: 55, color: '#a78bfa' }
  ];
  
  // Mock data for attendance metrics
  const attendanceData = [
    { month: 'Jan', workDays: 22, absentDays: 2, leaveDays: 1 },
    { month: 'Feb', workDays: 20, absentDays: 1, leaveDays: 2 },
    { month: 'Mar', workDays: 23, absentDays: 0, leaveDays: 0 },
    { month: 'Apr', workDays: 21, absentDays: 1, leaveDays: 1 },
    { month: 'May', workDays: 22, absentDays: 2, leaveDays: 0 },
    { month: 'Jun', workDays: 21, absentDays: 0, leaveDays: 2 }
  ];
  
  // Mock data for position distribution
  const positionData = [
    { name: 'Manager', count: 15, color: '#38bdf8' },
    { name: 'Developer', count: 45, color: '#4ade80' },
    { name: 'Designer', count: 20, color: '#fcd34d' },
    { name: 'Analyst', count: 25, color: '#fb7185' },
    { name: 'Support', count: 30, color: '#a78bfa' }
  ];

  // Mock data for salary metrics
  const salaryData = [
    { month: 'Jan', baseSalary: 850, bonus: 120, deductions: 70, netSalary: 900 },
    { month: 'Feb', baseSalary: 850, bonus: 100, deductions: 50, netSalary: 900 },
    { month: 'Mar', baseSalary: 875, bonus: 150, deductions: 75, netSalary: 950 },
    { month: 'Apr', baseSalary: 875, bonus: 180, deductions: 80, netSalary: 975 },
    { month: 'May', baseSalary: 900, bonus: 200, deductions: 100, netSalary: 1000 },
    { month: 'Jun', baseSalary: 900, bonus: 150, deductions: 90, netSalary: 960 }
  ];

  const summaryMetrics = [
    { id: 1, value: 280, label: 'Total Employees', change: '+5% from last quarter', icon: 'users', color: 'bg-blue-50' },
    { id: 2, value: 1.2, label: 'Total Payroll (M)', change: '+3.2% from last quarter', icon: 'dollar', color: 'bg-green-50' },
    { id: 3, value: 5, label: 'Departments', change: 'No change', icon: 'departments', color: 'bg-amber-50', trend: 'neutral' },
    { id: 4, value: 92, label: 'Attendance Rate %', change: '+1.5% from last quarter', icon: 'calendar', color: 'bg-purple-50' }
  ];

  const departments = ['all', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  const dateRanges = ['weekly', 'monthly', 'quarterly', 'yearly'];

  // Render different report content based on active tab
  const renderReportContent = () => {
    switch (activeTab) {
      case 'human':
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
                  <div className="text-4xl font-bold text-green-500">245</div>
                  <div className="text-sm text-gray-500 mt-1">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500">15</div>
                  <div className="text-sm text-gray-500 mt-1">On Leave</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500">20</div>
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
      case 'payroll':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Salary Components */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Salary Components</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`$${value}K`, '']} />
                  <Legend />
                  <Bar dataKey="baseSalary" name="Base Salary" stackId="a" fill="#38bdf8" />
                  <Bar dataKey="bonus" name="Bonus" stackId="a" fill="#4ade80" />
                  <Bar dataKey="deductions" name="Deductions" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Net Salary Trend */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Net Salary Trend</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">Export</button>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salaryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => [`$${value}K`, '']} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="netSalary" 
                    name="Net Salary" 
                    stroke="#8b5cf6" 
                    strokeWidth={3} 
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Department Payroll Breakdown */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Department Payroll Breakdown</h3>
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
                  <Tooltip formatter={(value) => [`$${value * 3}K`, 'Payroll']} />
                  <Legend formatter={(value) => `${value} ($${departmentData.find(item => item.name === value)?.value * 3}K)`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Salary Changes */}
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Recent Salary Changes</h3>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">IT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$4,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,000</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+11.1%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mary Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Marketing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,800</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$4,200</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+10.5%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Robert Davis</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Finance</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,200</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,500</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+5.8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">HR & Payroll Dashboard</h1>
          <div className="flex space-x-2">
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={activeDepartment}
              onChange={(e) => setActiveDepartment(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept === 'all' ? 'All Departments' : dept}</option>
              ))}
            </select>
            <select 
              className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              {dateRanges.map(range => (
                <option key={range} value={range}>{range.charAt(0).toUpperCase() + range.slice(1)}</option>
              ))}
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
              Generate Report
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow p-4 flex items-center border border-gray-200">
              <div className={`${metric.color} p-3 rounded-lg mr-4`}>
                {metric.id === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                )}
                {metric.id === 2 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                )}
                {metric.id === 3 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                )}
                {metric.id === 4 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                  {metric.id === 2 && <span className="text-sm text-gray-500">M</span>}
                </div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className={`text-xs ${metric.trend === 'down' ? 'text-red-500' : (metric.trend === 'neutral' ? 'text-gray-500' : 'text-green-500')}`}>
                  {metric.trend === 'down' ? '↓' : (metric.trend === 'neutral' ? '→' : '↑')} {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Report Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'human' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('human')}
            >
              Employee Report
            </button>
            <button
              className={`py-3 px-6 font-medium ${activeTab === 'payroll' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('payroll')}
            >
              Payroll Report
            </button>
          </div>
        </div>

        {/* Dynamic Report Content */}
        {renderReportContent()}
      </div>
    </div>
  );
}
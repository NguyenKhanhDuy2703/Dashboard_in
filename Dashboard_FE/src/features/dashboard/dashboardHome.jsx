import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('human');
  
  const chartData = [
    { name: 'Figma', department: 32, jobTitle: 42, active: 55 },
    { name: 'Sketch', department: 28, jobTitle: 65, active: 70 },
    { name: 'XD', department: 85, jobTitle: 65, active: 61 },
    { name: 'Photoshop', department: 11, jobTitle: 80, active: 70 },
    { name: 'Illustrator', department: 45, jobTitle: 43, active: 62 },
    { name: 'After Effect', department: 35, jobTitle: 50, active: 75 }
  ];

  const summaryMetrics = [
    { id: 1, value: 250, label: 'Total number of staff', change: '+12% more than last quarter', icon: 'users', color: 'bg-blue-50' },
    { id: 2, value: 100, label: 'Total payroll cost / month', change: '-0.7% lower than last quarter', icon: 'dollar', color: 'bg-blue-50', trend: 'down' },
    { id: 3, value: 10, label: 'Total department', change: '+2% more than last quarter', icon: 'departments', color: 'bg-blue-50' },
    { id: 4, value: 10, label: 'Total job', change: '+2% more than last quarter', icon: 'jobs', color: 'bg-blue-50' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className={`${metric.color} p-3 rounded-lg mr-4`}>
                {metric.id === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                )}
                {metric.id === 2 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                )}
                {metric.id === 3 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                  </svg>
                )}
                {metric.id === 4 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                  </svg>
                )}
              </div>
              <div>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-bold text-gray-800">{metric.value}</span>
                  {metric.id === 2 && <span className="text-sm text-gray-500">K</span>}
                </div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <p className={`text-xs ${metric.trend === 'down' ? 'text-red-500' : 'text-green-500'}`}>
                  {metric.trend === 'down' ? '↓' : '↑'} {metric.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Report Tabs */}
        <div className="mb-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'human' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('human')}
            >
              Human report
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === 'payroll' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('payroll')}
            >
              Payroll report
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-blue-200 relative">
          <div className="absolute top-6 left-6">
            <div className="flex items-center">
              <div className="w-10 h-1 bg-blue-500 mr-2"></div>
              <span className="text-sm font-medium">SL employee</span>
            </div>
          </div>
          
          <div className="absolute top-6 right-6 text-gray-500 text-sm font-medium">MORE</div>
          
          <div className="pt-10 pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Legend 
                  align="center" 
                  verticalAlign="bottom" 
                  wrapperStyle={{ paddingTop: '20px' }}
                />
                <Bar dataKey="department" name="Department" fill="#38bdf8" barSize={20} />
                <Bar dataKey="jobTitle" name="Job Title" fill="#4ade80" barSize={20} />
                <Bar dataKey="active" name="Active" fill="#fcd34d" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
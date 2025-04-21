import { useState } from 'react';

export default function ManagementTables() {
  const [selectedDepartment, setSelectedDepartment] = useState(4);
  const [selectedJob, setSelectedJob] = useState(4);
  
  const departmentData = [
    { id: 1, title: "Managing Director" },
    { id: 2, title: "Executive Director" },
    { id: 3, title: "General Manager" },
    { id: 4, title: "Deputy General Manager" },
    { id: 5, title: "Asst. General Manager" },
    { id: 6, title: "Principal Manager" },
    { id: 7, title: "Senior Manager" },
    { id: 8, title: "Manager" },
    { id: 9, title: "Deputy Manager" },
    { id: 10, title: "Asst. Manager" },
    { id: 11, title: "Snr. Executive Officer" }
  ];

  const jobTitleData = [
    { id: 1, title: "Managing Director" },
    { id: 2, title: "Executive Director" },
    { id: 3, title: "General Manager" },
    { id: 4, title: "Deputy General Manager" },
    { id: 5, title: "Asst. General Manager" },
    { id: 6, title: "Principal Manager" },
    { id: 7, title: "Senior Manager" },
    { id: 8, title: "Manager" },
    { id: 9, title: "Deputy Manager" },
    { id: 10, title: "Asst. Manager" },
    { id: 11, title: "Snr. Executive Officer" }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 min-h-screen">
      {/* Department Management Table */}
      <div className="bg-white rounded-lg shadow-md p-6 flex-1">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Department Management</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">S/N</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentData.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${item.id === selectedDepartment ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedDepartment(item.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id.toString().padStart(2, '0')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.title}
                    {item.id === selectedDepartment && (
                      <div className="w-1 h-full bg-blue-500 absolute right-0"></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Title Management Table */}
      <div className="bg-white rounded-lg shadow-md p-6 flex-1">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Job Title Management</h2>
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">S/N</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobTitleData.map((item) => (
                <tr 
                  key={item.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${item.id === selectedJob ? 'bg-blue-50' : ''}`}
                  onClick={() => setSelectedJob(item.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id.toString().padStart(2, '0')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.title}
                    {item.id === selectedJob && (
                      <div className="w-1 h-full bg-blue-500 absolute right-0"></div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
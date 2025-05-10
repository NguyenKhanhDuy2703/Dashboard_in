import { useEffect, useState } from 'react';
import {getAllDepartmentAndJobs} from "../../services/department.server"
export default function ManagementTables() {
  const [departments , setDepartments] = useState([]);
  const [jobTitles , setJobTitles] = useState([]);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  setLoading(true);
  const fetchDataDepartmentAndJob = async () => {
    try{
      const response = await getAllDepartmentAndJobs();
      setDepartments(response.data.departments);
      setJobTitles(response.data.jobTitles);
      // Handle the response data as needed
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } 
  }
  fetchDataDepartmentAndJob();
} , [])
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
              {departments.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 cursor-pointer "
                 
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.title}
                   
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
              {jobTitles.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 cursor-pointer"
             
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.title}
                  
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
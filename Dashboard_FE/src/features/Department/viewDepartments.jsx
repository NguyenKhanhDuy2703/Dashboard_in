import { useEffect, useState } from 'react';
import {getAllDepartmentAndJobs} from "../../services/department.server"
import FloatingLoader from '../../components/common/loading';
import {  useSelector } from 'react-redux';
import AccessDeniedPage from '../../components/common/notPermission';
import featureRoles from "../../utils/permissionRole.js"
export default function ManagementTables() {
  const [departments , setDepartments] = useState([]);
  const [jobTitles , setJobTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state);

 

useEffect(() => {
  setLoading(true);
  const fetchDataDepartmentAndJob = async () => {
    try{
      const response = await getAllDepartmentAndJobs();
      setDepartments(response.departments);
      setJobTitles(response.positions);
      // Handle the response data as needed
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  fetchDataDepartmentAndJob();
} , [])
 if(featureRoles.department.includes(user.role) === false)  {
    return (
      <AccessDeniedPage />
    );
  }
  if (loading) {
    return (
     <FloatingLoader />
    );
  }
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
                  key={item.DepartmentID} 
                  className="hover:bg-gray-50 cursor-pointer "     
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.DepartmentID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.DepartmentName}            
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobTitles.map((item) => (
                <tr 
                  key={item.PositionID} 
                  className="hover:bg-gray-50 cursor-pointer"
             
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.PositionID}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex justify-between items-center">
                    {item.PositionName}
                  
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
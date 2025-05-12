import { TrendingUp, Users } from "lucide-react";

 function TotalEmployeesCard({totalEmployees}) {
 
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Total Employees</h2>
        <div className="bg-blue-100 p-2 rounded-full">
          <Users size={20} className="text-blue-600" />
        </div>
      </div>
      
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold">{totalEmployees} </span>
        <div className="flex items-center text-sm text-green-600 mb-1">
          <TrendingUp size={16} className="mr-1" />
        </div>
      </div>
      
     
    </div>
  );
}
export default TotalEmployeesCard;
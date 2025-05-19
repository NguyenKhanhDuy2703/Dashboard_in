import { DollarSign, TrendingUp } from "lucide-react";
import numeral from 'numeral';
 function TotalSalaryBudgetCard({totalSalary}) {
  // Sample data - would be replaced with actual data in a real application
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Total Salary Budget</h2>
        <div className="bg-green-100 p-2 rounded-full">
          <DollarSign size={20} className="text-green-600" />
        </div>
      </div>
      
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold">{numeral(totalSalary).format('0,0.00')+' USD'}</span>
        <div className="flex items-center text-sm text-green-600 mb-1">
          <TrendingUp size={16} className="mr-1" />
         
        </div>
      </div>
    
    </div>
  );
}
export default TotalSalaryBudgetCard;
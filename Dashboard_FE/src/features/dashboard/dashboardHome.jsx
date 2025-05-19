
import {  useEffect, useState } from 'react';
import HumanReport from './component/humanReport';
import PayrollReport from './component/payrollReport';
import {reportFollowingDepartment , reportFollowingPosition , reportFollowingStatus , reportFollowingAttendanceMonth , reportSalaryFollowingDepartment , reportSalaryFollowingMonth , reportTotalEAS} from "../../services/report.service"
import FloatingLoader from '../../components/common/loading';
import TotalSalaryBudgetCard from './component/totalSalaryBudgetCard';
import TotalEmployeesCard from './component/totalEmployeesCard';
import featureRoles from '../../utils/permissionRole';
import { useSelector } from 'react-redux';
import AccessDeniedPage from '../../components/common/notPermission';
export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('human');
 const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
const [positions, setPositions] = useState([]);
const[status, setStatus] = useState([]);
const [attendanceMonth, setAttendanceMonth] = useState([]);
  const [salaryDepartment, setSalaryDepartment] = useState([]);
  const [salaryMonth, setSalaryMonth] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSalary, setTotalSalaryBudget] = useState(0);
  useEffect(() => {
      // Fetch departments data
      setLoading(true);
  const fetchDataReport = async () => {
    try {
      const responseDepartment = await reportFollowingDepartment();
      const responsePosition = await reportFollowingPosition();
      const responseStatus = await reportFollowingStatus();
      const responseAttendanceMonth = await reportFollowingAttendanceMonth();
      const responseSalaryDepartment = await reportSalaryFollowingDepartment();
      const responseSalaryMonth = await reportSalaryFollowingMonth();
      const responseTotalEAS = await reportTotalEAS();
      console.log(responseTotalEAS);
      setTotalEmployees(responseTotalEAS.data.data.totalEmployees);
      setTotalSalaryBudget(responseTotalEAS.data.data.totalSalary);
      setSalaryMonth(responseSalaryMonth.data.data);
      setSalaryDepartment(responseSalaryDepartment.data.data);
      setPositions(responsePosition.data.data);
      setDepartments(responseDepartment.data.data);
      setStatus(responseStatus.data.data);
      setAttendanceMonth(responseAttendanceMonth.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
    fetchDataReport();
  }, []);
  




  // Render different report content based on active tab
  const renderReportContent = ({departments , positions ,status , attendanceMonth , salaryDepartment , salaryMonth}) => {
    switch (activeTab) {
      case 'human':
     return (
       <HumanReport departments ={departments}  positions = {positions}  status= {status} attendanceMonth ={attendanceMonth}/>
     )
      case 'payroll':
        return (
          <PayrollReport salaryDepartment = {salaryDepartment}  salaryMonth= {salaryMonth}/>
        )
      default:
        return null;
    }
  };
 const  user  = useSelector((state) => state.user);
 if(featureRoles.dashboard.includes(user.role) === false)  {
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="flex flex-col md:flex-row gap-6 w-full">
      <div className="w-full md:w-1/2">
        <TotalEmployeesCard  totalEmployees = {totalEmployees}/>
      </div>
      <div className="w-full md:w-1/2">
        <TotalSalaryBudgetCard totalSalary = {totalSalary} />
      </div>
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
        {renderReportContent({departments , positions , status , attendanceMonth , salaryDepartment , salaryMonth})}
      </div>
   
  );
}
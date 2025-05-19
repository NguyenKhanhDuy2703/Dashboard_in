import { useEffect, useState } from 'react';
import { 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar 
} from 'lucide-react';
import { notificationAnniversary, notificationLeaveViolation } from "../../../services/notification";

export default function NotificationSystem() {
  const [activeTab, setActiveTab] = useState('anniversary');
  const [workAnniversaryNotifications, setWorkAnniversaryNotifications] = useState([]);
  const [leaveWarningNotifications, setLeaveWarningNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseAnniversary = await notificationAnniversary();
        const responseLeaveViolation = await notificationLeaveViolation();
        setWorkAnniversaryNotifications(responseAnniversary.data || []);
        setLeaveWarningNotifications(responseLeaveViolation.data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchData();
  }, []);

  // Tabs
  const NotificationTabs = () => (
    <div className="flex border-b mb-4">
      <button 
        className={`px-4 py-2 flex items-center ${activeTab === 'anniversary' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => setActiveTab('anniversary')}
      >
        <Award className="mr-2 h-5 w-5" />
        Work Anniversaries
      </button>
      <button 
        className={`px-4 py-2 flex items-center ${activeTab === 'leave' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
        onClick={() => setActiveTab('leave')}
      >
        <AlertTriangle className="mr-2 h-5 w-5" />
        Leave Warnings
      </button>
    </div>
  );

  // Work Anniversary Notifications
  const WorkAnniversaryNotifications = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <Award className="mr-2 text-green-600" />
          Work Anniversaries ({workAnniversaryNotifications.length})
        </h2>
      </div>
      {workAnniversaryNotifications.length > 0 ? (
        workAnniversaryNotifications.map((employee) => (
          <div key={employee.employeeID} className="bg-green-100 rounded-md mb-2 p-3">
            <div className="flex items-center">
              <div className="mr-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-xl font-medium">Congratulations {employee.FullName}!</p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  You're celebrating {employee.Years} years with the company. Your joining date was {employee.hireDate}.
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No work anniversaries today.</p>
      )}
    </div>
  );

  // Leave Warning Notifications
  const LeaveWarningNotifications = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold flex items-center">
          <AlertTriangle className="mr-2 text-red-600" />
          Leave Warnings ({leaveWarningNotifications.length})
        </h2>
      </div>
      {leaveWarningNotifications.length > 0 ? (
        leaveWarningNotifications.map((employee) => (
          <div key={employee.employeeID} className="bg-red-100 rounded-md mb-2 p-3">
            <div className="flex items-center">
              <div className="mr-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-xl font-medium">Leave Warning for {employee.FullName}</p>
                <p className="text-sm text-gray-600">Please review your leave status</p>
                <p className="text-sm text-gray-600">You have {employee.LeaveDays} leave days remaining</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No leave warnings at the moment.</p>
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <NotificationTabs />
      {activeTab === 'anniversary' && <WorkAnniversaryNotifications />}
      {activeTab === 'leave' && <LeaveWarningNotifications />}
    </div>
  );
}

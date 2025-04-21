import { useState } from 'react';

export default function NotificationSystem() {
  const [activeTab, setActiveTab] = useState('unread');
  const [selectedNotifications, setSelectedNotifications] = useState({});

  // Sample data for colored notifications
  const coloredNotifications = [
    { id: 1, message: "Your payment invoice request has been approved by Admin", time: "Just now", color: "bg-green-100", avatar: "1", date: "today", selected: false },
    { id: 2, message: "Your payment invoice request has been approved by Admin", time: "1 min ago", color: "bg-red-100", avatar: "2", date: "today", selected: false },
    { id: 3, message: "Your payment invoice request has been approved by Admin", time: "5 min ago", color: "bg-orange-100", avatar: "3", date: "today", selected: false },
    { id: 4, message: "Your payment invoice request has been approved by Admin", time: "10 min ago", color: "bg-blue-100", avatar: "4", date: "today", selected: false },
    { id: 5, message: "Your payment invoice request has been approved by Admin", time: "1 hour ago", color: "bg-green-100", avatar: "1", date: "yesterday", selected: false },
    { id: 6, message: "Your payment invoice request has been approved by Admin", time: "3 hrs ago", color: "bg-red-100", avatar: "2", date: "yesterday", selected: false },
    { id: 7, message: "Your payment invoice request has been approved by Admin", time: "5 hrs ago", color: "bg-orange-100", avatar: "3", date: "yesterday", selected: false },
  ];

  // Sample data for HR notifications
  const hrNotifications = [
    { 
      id: 1, 
      date: "Friday, Nov 11", 
      time: "10:00am", 
      content: [
        "Lorem ipsum dolor sit amet consectetur. Aliquet nisl toreof nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
        "Lorem ipsum dolor sit amet consectetur. Aliquet nisl toreof nunc enim dignissim pulvinarenim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id."
      ]
    },
    { 
      id: 2, 
      date: "Saturday, Nov 12", 
      time: "01:20pm", 
      content: [
        "Lorem ipsum dolor sit amet consectetur. Aliquet nisl toreof nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id.",
        "Lorem ipsum dolor sit amet consectetur. Aliquet nisl toreof nunc enim dignissim pulvinarenim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id."
      ]
    },
    { 
      id: 3, 
      date: "Sunday, Nov 13", 
      time: "09:20am", 
      content: [
        "Lorem ipsum dolor sit amet consectetur. Aliquet nisl toreof nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id nunc enim dignissim pulvinar ut enim nulla. Lorem eget ultrices est tellus enim proin id."
      ]
    }
  ];

  // Group notifications by date
  const groupedNotifications = coloredNotifications.reduce((acc, notification) => {
    if (!acc[notification.date]) {
      acc[notification.date] = [];
    }
    acc[notification.date].push(notification);
    return acc;
  }, {});

  const handleSelectAll = (date) => {
    // Logic for selecting all notifications of a particular date
    const updatedSelected = {...selectedNotifications};
    updatedSelected[date] = !updatedSelected[date];
    setSelectedNotifications(updatedSelected);
  };

  // Avatar component for colored notifications
  const Avatar = ({ index }) => {
    const colors = ['bg-orange-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500'];
    return (
      <div className={`w-8 h-8 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-medium`}>
        {index}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-50 min-h-screen">
      {activeTab === 'unread' ? (
        <div className="unread-notifications p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notifications ({coloredNotifications.length} unread)</h2>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm">
              Mark All as Read
            </button>
          </div>

          {Object.entries(groupedNotifications).map(([date, notifications]) => (
            <div key={date} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium capitalize">{date === 'today' ? 'Today' : 'Yesterday (30th November, 2023)'}</h3>
                <div className="flex items-center gap-1">
                  <input 
                    type="checkbox" 
                    checked={selectedNotifications[date] || false}
                    onChange={() => handleSelectAll(date)}
                    className="h-3 w-3"
                  />
                  <span className="text-xs">Select all</span>
                </div>
              </div>

              {notifications.map((notification) => (
                <div key={notification.id} className={`${notification.color} rounded-md mb-2 relative overflow-hidden`}>
                  <div className="flex items-start p-3 pr-8">
                    <div className="mr-3 mt-1">
                      <Avatar index={parseInt(notification.avatar)} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    <div className="absolute right-2 top-3">
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-1 absolute right-0 top-0 h-full bg-blue-500"></div>
                </div>
              ))}
            </div>
          ))}
          
          <div className="text-center text-xs text-gray-500 mt-8">
            Copyright © 2023 Data Energy. All Rights Reserved
          </div>
        </div>
      ) : (
        <div className="hr-notifications p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Notifications from HR</h2>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm">
              Delete All
            </button>
          </div>

          {hrNotifications.map((group) => (
            <div key={group.id} className="mb-8">
              <div className="mb-3">
                <h3 className="text-base font-medium">{group.date}</h3>
                <span className="text-sm text-gray-500">{group.time}</span>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4 relative overflow-hidden">
                {group.content.map((paragraph, idx) => (
                  <p key={idx} className="text-sm text-gray-700 mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
                <div className="w-1 absolute right-0 top-0 h-full bg-blue-500"></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
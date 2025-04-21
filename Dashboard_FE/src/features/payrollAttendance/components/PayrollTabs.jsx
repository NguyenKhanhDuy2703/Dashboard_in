import { useEffect, useState } from 'react';

export default function PayrollTabs({ activeTab: propActiveTab, onTabChange }) {
  // Use the prop value if provided, otherwise use local state
  const [activeTab, setActiveTab] = useState(propActiveTab || 'Payroll');
  
  const tabs = [
    { id: 'Payroll', label: 'Payroll', icon: '💰' },
    { id: 'Salary history', label: 'Salary History', icon: '📊' },
    { id: 'Attendance records', label: 'Attendance Records', icon: '📅' }
  ];

  // Handle tab changes and propagate to parent
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };
  
  // Update local state if prop changes
  useEffect(() => {
    if (propActiveTab && propActiveTab !== activeTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);

  // Notify parent when local state changes
  useEffect(() => {
    onTabChange(activeTab);
  }, [activeTab, onTabChange]);

  return (
    <div className="px-4">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-4 text-sm font-medium transition-all duration-200 flex items-center ${
              activeTab === tab.id 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 bg-opacity-50' 
                : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
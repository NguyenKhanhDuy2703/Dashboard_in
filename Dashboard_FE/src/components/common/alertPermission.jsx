import { useState, useEffect } from 'react';
import { AlertCircle, X, Loader } from 'lucide-react';

// Permission Notification Modal Component with loading effect
const PermissionModal = ({ isOpen, onClose, featureInfo }) => {
  const [loading, setLoading] = useState(true);
  
  // Start loading animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate permission check delay (1 second)
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen || !featureInfo) return null;

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
      {/* Modal */}
      <div className="w-full max-w-md mx-4 border rounded-lg shadow-lg bg-red-50 border-red-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="font-medium text-lg">{featureInfo.title}</h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader className="w-8 h-8 text-red-500 animate-spin mb-3" />
              <p>Checking permissions...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <p className="text-center font-medium mb-2">Access Denied</p>
              <p className="text-center mb-4">{featureInfo.description}</p>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Demo to showcase how to use the component
const PermissionModalDemo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);

  // Only access denied features
  const restrictedFeatures = {
    settings: {
      title: 'System Settings',
      description: 'You do not have permission to access system settings. Please contact your administrator if you need access.',
    },
    reports: {
      title: 'Financial Reports',
      description: 'You do not have sufficient privileges to view financial reports. This action will be logged.',
    },
    userManagement: {
      title: 'User Management',
      description: 'Admin privileges required. Your current role does not allow access to user management functions.',
    },
    dataExport: {
      title: 'Data Export',
      description: 'Export functionality is restricted to senior staff members only.',
    }
  };

  // Open modal with corresponding feature information
  const accessFeature = (featureKey) => {
    setCurrentFeature(restrictedFeatures[featureKey]);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
  };

  // Show modal immediately when component mounts
  useEffect(() => {
    // Default to open settings modal when component loads
    accessFeature('settings');
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Restricted Features Demo</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.keys(restrictedFeatures).map((key) => (
          <button
            key={key}
            onClick={() => accessFeature(key)}
            className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <div className="font-medium">{restrictedFeatures[key].title}</div>
            <div className="text-sm text-gray-500">Click to attempt access</div>
          </button>
        ))}
      </div>
      
      {/* Permission Modal Component */}
      <PermissionModal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        featureInfo={currentFeature}
      />
    </div>
  );
};

export default PermissionModalDemo;
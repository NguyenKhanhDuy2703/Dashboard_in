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


export default PermissionModal;
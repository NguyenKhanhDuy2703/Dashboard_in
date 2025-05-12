import { useState, useEffect } from "react";
import StaffHeader from "../components/staffHeader";
import StaffTable from "../components/StaffTable";
import { useSelector } from "react-redux";
import featureRoles from "../../../utils/permissionRole";
import AccessDeniedPage from "../../../components/common/notPermission";

const StaffManagementPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Giả lập tải dữ liệu
  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  //check role
  const { user } = useSelector((state) => state);
  console.log(user);
   if(featureRoles.human.view.includes(user.role) === false)  {
      return (
        <AccessDeniedPage />
      );
    }
  

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pt-6">     
        <div className="space-y-6">
          {/* Header section */}
          <StaffHeader />

          {/* Main content */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
            {isLoading ? (
              // Loading state
              <div className="flex items-center justify-center h-64">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
                  <div className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0 animate-spin"></div>
                </div>
              </div>
            ) : (
              // Table section
              <StaffTable />
            )}
          </div>
          
      
        </div>
      </div>
    </div>
  );
};

export default StaffManagementPage;
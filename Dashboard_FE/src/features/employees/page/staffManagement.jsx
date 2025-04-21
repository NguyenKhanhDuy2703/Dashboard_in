import StaffHeader from "../../../components/common/staffHeader"
import StaffTable from "../components/StaffTable"
const StaffManagementPage = () => {
  return (
    <div className="min-h-screen w-full py-8 px-4 bg-gray-100">
      <div className="w-full mx-auto max-w-7xl space-y-6">
        {/* Header section */}
        <StaffHeader />

        {/* Table section */}
        
          <StaffTable />
        </div>
      </div>
    
  );
};

export default StaffManagementPage;

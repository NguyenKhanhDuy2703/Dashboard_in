import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { fetchUser } from "../features/auth/authSlice";
import Header from "../components/common/header";
import PermissionModal from "../components/common/alertPermission";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user  } = useSelector((state) => state);
//   const restrictedFeatures = {
//   authorization: {
//     title: "Không có quyền truy cập",
//     description: "Bạn không có quyền truy cập vào hệ thống. Vui lòng liên hệ quản trị viên.",
//   },
//   settings: {
//     title: "System Settings",
//     description: "You do not have permission to access system settings. Please contact your administrator.",
//   },
//   reports: {
//     title: "Financial Reports",
//     description: "You do not have sufficient privileges to view financial reports. This action will be logged.",
//   },
//   userManagement: {
//     title: "User Management",
//     description: "Admin privileges required. Your current role does not allow access to user management functions.",
//   },
//   dataExport: {
//     title: "Data Export",
//     description: "Export functionality is restricted to senior staff members only.",
//   },
// };
  const navigate = useNavigate();
  // const [featureInfo, setFeatureInfo] = useState(null); // để truyền thông tin cụ thể vào modal
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser()).unwrap();
      } catch (error) {
      
        setTimeout(() => {
          navigate("auth/login");
        }, 2000); // Đợi 2s trước khi chuyển trang
      }
    };
    fetchUserData();
  }, [dispatch, navigate]);

//  const [modalOpen, setModalOpen] = useState(false);


//   // Open modal with corresponding feature information
//   const accessFeature = () => {
//     setModalOpen(true);
//   };

//   // Close modal
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   // Show modal immediately when component mounts
//   useEffect(() => {
//     // Default to open settings modal when component loads
//     accessFeature('authorization');
//   }, []);

 
 
if(!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FloatingLoader />
      </div>
    );
  }
  return (
    <div className="flex bg-gray-50 min-h-screen w-full">
      <div className="fixed top-0  left-0 right-0 z-10">
        <Header user={user} />
      </div>

      <div className="w-full transition-all duration-300">
        {/* Main content */}
        <main className="pt-24 px-3 pb-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUser } from "../features/auth/authSlice";
import Header from "../components/common/header";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchUser()); 
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [dispatch]);

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
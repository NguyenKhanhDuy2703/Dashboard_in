import { Outlet } from "react-router-dom";
import Header from "../components/common/header";
import Sidebar from "../components/common/sideBar";

const MainLayout = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen w-full">
      {/* Sidebar - cố định */}
      <div className=" h-screen w-[240px] bg-white shadow-md rounded-tr-2xl rounded-br-2xl p-4 fixed top-0 left-0 z-20">
        <Sidebar />
      </div>

      {/* Wrapper cho phần còn lại */}
      <div className="ml-[240px] w-full">
        {/* Header cố định */}
        <div className="fixed top-0 left-[240px] right-0 z-10">
          <Header />
        </div>

        {/* Main content dưới header */}
        <main className="pt-24 px-8 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

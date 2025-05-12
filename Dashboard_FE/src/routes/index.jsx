import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/authLayout";

import Login from "../features/auth/page/login";
import TwoFactorAuth from "../features/auth/page/TwoFactor";
import MainLayout from "../layouts/mainLayout";
import StaffManagementPage from "../features/employees/page/staffManagement";
import AddStaffForm from "../features/employees/page/addNewEmployee";
import EditStaffProfile from "../features/employees/page/editStaff";
import PayrollAttendanceLayout from "../features/payrollAttendance/layout/payrollAttendance.layout";
import ManagementTables from "../features/Department/viewDepartments";
import NotificationSystem from "../features/notification/pages/Notification";
import HRDashboard from "../features/dashboard/dashboardHome";
import EditSalary from "../features/payrollAttendance/pages/editSalary";


const AppRouter = () => {

    return (
        <Routes>
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="2fa" element={<TwoFactorAuth />} />
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="/" element={<MainLayout />} >
                <Route path="/" element ={<HRDashboard />} />
                <Route path="staff" element={<StaffManagementPage />} />
                <Route path="edit-staff/:id" element={<EditStaffProfile />} />
                <Route path="add-staff" element={<AddStaffForm />} />
                <Route path="payroll-attendance" element={<PayrollAttendanceLayout />} >
           
                </Route>
                <Route path="edit-salary/:id" element={<EditSalary />} />
                <Route path="department-job-titles" element={<ManagementTables />} />
                <Route path="notifications" element={<NotificationSystem />} />


            </Route>

           
        </Routes>
    )
}
export default AppRouter;
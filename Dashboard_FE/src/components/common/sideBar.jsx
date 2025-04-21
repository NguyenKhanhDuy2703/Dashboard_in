import {
  Home,
  User,
  BarChart2,
  Bell,
  Settings,
  Briefcase,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { icon: <Home size={18} />, label: "Dashboard", to: "/" },
  { icon: <User size={18} />, label: "Staff", to: "/staff" },
  { icon: <BarChart2 size={18} />, label: "Payroll", to: "/payroll-attendance" },
  { icon: <Briefcase size={18} />, label: "Departments", to: "/department-job-titles" },
  { icon: <Bell size={18} />, label: "Notifications", to: "/notifications" },
  { icon: <Settings size={18} />, label: "Settings", to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-52 p-4">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold text-blue-600">HR Dashboard</h1>
      </div>

      <nav className="space-y-1.5">
        {menuItems.map((item) => (
          <SidebarItem key={item.to} {...item} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2.5 p-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer
        ${isActive ? "bg-blue-100 text-blue-600 font-medium" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

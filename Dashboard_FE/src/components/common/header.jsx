import { Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white shadow-md rounded-bl-2xl flex items-center justify-between px-2.5" >
      <div>
        <h2 className="text-lg font-semibold">Welcome, Mr. Otor John 👋</h2>
        <p className="text-sm text-gray-500">Dashboard Overview</p>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <UserCircle className="w-8 h-8 text-gray-700" />
          <span className="font-medium">Otor John</span>
        </div>
      </div>
    </header>
  );
}

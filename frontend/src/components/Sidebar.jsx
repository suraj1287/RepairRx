// frontend/src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-4">
      <h1 className="text-2xl font-bold mb-8 flex items-center">
        <span className="mr-2">🛠️</span> RepairRx
      </h1>
      <nav className="flex flex-col gap-2">
        <Link
          to="/analyze"
          className={`px-4 py-2 rounded ${
            isActive("/analyze")
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
          }`}
        >
          Analyze Logs
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
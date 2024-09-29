// components/Sidebar.tsx
// components/Sidebar.tsx
import React from 'react';

const Sidebar = ({ isSidebarOpen, setCurrentSection }) => {
  return (
    <aside
      className={`fixed top-0 inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out bg-white shadow-md w-64 z-30 md:relative md:translate-x-0`}
    >
      <div className="p-4 flex items-center">
        <img
          src="https://placehold.co/50x50"
          alt="Profile picture of Anny Glover"
          className="rounded-full w-12 h-12"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">Anny Glover</h2>
          <p className="text-sm text-gray-500">Super Admin</p>
        </div>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="px-4 py-2 text-pink-600 bg-pink-100 rounded-md mb-2 flex items-center" onClick={() => setCurrentSection('dashboard')}>
            <i className="fas fa-home mr-2"></i> Dashboard
          </li>
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md mb-2 flex items-center" onClick={() => setCurrentSection('foodItemManage')}>
            <i className="fas fa-utensils mr-2"></i> Food Item Manage
          </li>
          {/* Add more items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

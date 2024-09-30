import React from 'react';

interface HeaderProps {
  onToggleSidebar: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <button
          className="md:hidden text-gray-600 mr-4"
          onClick={() => onToggleSidebar(true)}
        >
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-2xl font-bold text-pink-600 mr-4">HotelAir</h1>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex items-center">
        <i className="fas fa-bell text-gray-600 mr-4"></i>
        <i className="fas fa-cog text-gray-600 mr-4"></i>
        <img
          src="https://placehold.co/40x40"
          alt="Profile picture of Michelle"
          className="rounded-full w-10 h-10"
        />
      </div>
    </header>
  );
};

export default Header;
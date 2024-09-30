'use client';

import React, { useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import Header from '../../../../components/Header';
import Card from '../../../../components/Card'; // Ensure Card is correctly imported
import Table from '../../../../components/Table';
import ReservationChart from '../../../../components/ReservationChart';
import FoodManagementSection from '@/components/FoodManagementSection';

const MainPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('dashboard');

  const bookings = [
    { name: 'Frank Baker', roomType: 'Single', checkIn: '12/03/2024', checkOut: '13/03/2024', paidAmount: '$0.00', dueAmount: '$230', paymentStatus: 'Pending' },
    { name: 'Phil Glover', roomType: 'Studio', checkIn: '12/03/2024', checkOut: '21/03/2024', paidAmount: '$4,450', dueAmount: '$0.00', paymentStatus: 'Pending' },
    { name: 'Rya Randall', roomType: 'Deluxe', checkIn: '12/03/2024', checkOut: '24/03/2024', paidAmount: '$0.00', dueAmount: '$430', paymentStatus: 'Pending' },
    { name: 'Sally Graham', roomType: 'Queen', checkIn: '12/03/2024', checkOut: '19/03/2024', paidAmount: '$1,250', dueAmount: '$0.00', paymentStatus: 'Paid' },
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card title="Today's Check In" value={40} change={10} />  {/* Updated value and change to number */}
              <Card title="Today's Check Out" value={20} change={5} />
              <Card title="Total Reservations" value={300} change={20} />
              <Card title="Total Guests" value={200} change={30} />
            </div>
            <ReservationChart />
            <Table bookings={bookings} />
          </>
        );
      case 'foodItemManage':
        return (
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold">Food Item Management</h2>
            <FoodManagementSection />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setCurrentSection={setCurrentSection} />
      <div className="flex-1 p-4 box-border">
      <Header onToggleSidebar={setIsSidebarOpen} />
        {renderSection()}
      </div>
    </div>
  );
};

export default MainPage;

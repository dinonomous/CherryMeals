// components/ReservationChart.tsx
import React from 'react';

const ReservationChart = () => {
  return (
    <section className="bg-white p-6 rounded-md shadow-md mb-6">
      <h2 className="text-lg font-bold mb-4">Reservations</h2>
      <img
        src="https://placehold.co/600x300"
        alt="Graph showing booking confirmed and booking pending trends"
      />
    </section>
  );
};

export default ReservationChart;

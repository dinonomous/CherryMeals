// components/Table.tsx
import React from 'react';

const Table = ({ bookings }) => {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr>
          <th className="border-b p-2">NAME</th>
          <th className="border-b p-2">ROOM TYPE</th>
          <th className="border-b p-2">CHECK IN</th>
          <th className="border-b p-2">CHECK OUT</th>
          <th className="border-b p-2">PAID AMOUNT</th>
          <th className="border-b p-2">DUE AMOUNT</th>
          <th className="border-b p-2">PAYMENT STATUS</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking, index) => (
          <tr key={index}>
            <td className="border-b p-2">{booking.name}</td>
            <td className="border-b p-2">{booking.roomType}</td>
            <td className="border-b p-2">{booking.checkIn}</td>
            <td className="border-b p-2">{booking.checkOut}</td>
            <td className="border-b p-2">{booking.paidAmount}</td>
            <td className="border-b p-2">{booking.dueAmount}</td>
            <td className="border-b p-2">
              <span className={`bg-${booking.paymentStatus === 'Pending' ? 'yellow-200 text-yellow-700' : 'green-200 text-green-700'} p-1 rounded`}>
                {booking.paymentStatus}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

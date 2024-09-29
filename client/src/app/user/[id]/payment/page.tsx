'use client'; // Ensure this is at the top to use client-side features like useRouter

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router' in app directory

// Define the types for order items and order data
interface OrderItem {
  foodId: string;
  quantity: number;
  price: number;
}

interface Order {
  items: OrderItem[];
  totalAmount: number;
  _id: string; // Make sure to include the orderId from backend
}

const PaymentPage = () => {
  const [orderData, setOrderData] = useState<Order[] | null>(null);
  const router = useRouter(); // For navigation

  useEffect(() => {
    const storedOrderData = localStorage.getItem("orderData");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  if (!orderData) {
    return <p>Loading...</p>;
  }

  const handleProceedToPayment = () => {
    const order = orderData[0]; // Assuming there is at least one order
    if (order) {
      const amount = order.totalAmount;
      const formattedAmount = (amount).toFixed(1);
      const orderId = order._id;

      // Redirect to the initiate payment URL with the amount as a query parameter
      router.push(`http://localhost:2560/api/v1/users/proceed/${orderId}?amount=${formattedAmount}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Order Summary</h2>
  
  <ul className="space-y-4">
    {orderData.map((order, index) => (
      <li key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
        {order.items.map((item) => (
          <p key={item.foodId} className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">{item.foodId}</span> - Quantity: {item.quantity} - Price: ₹{item.price}
          </p>
        ))}
        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-4">
          Total Amount: ₹{order.totalAmount}
        </p>
      </li>
    ))}
  </ul>

  <button 
    onClick={handleProceedToPayment}
    className="mt-6 w-full bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out shadow-md focus:outline-none"
  >
    Proceed to Payment
  </button>
</div>

  );
};

export default PaymentPage;

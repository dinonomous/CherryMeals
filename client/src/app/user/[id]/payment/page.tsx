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
    <div>
      <h2>Order Summary</h2>
      <ul>
        {orderData.map((order, index) => (
          <li key={index}>
            {order.items.map(item => (
              <p key={item.foodId}>
                {item.foodId} - Quantity: {item.quantity} - Price: {item.price}
              </p>
            ))}
            <p>Total Amount: {order.totalAmount}</p>
          </li>
        ))}
      </ul>
      <button onClick={handleProceedToPayment}>Proceed to Payment</button>
    </div>
  );
};

export default PaymentPage;

'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  paymentLink: string;
};

interface OrdersPageProps {
  params: {
    id: string;
  };
}

const OrdersPage: React.FC<OrdersPageProps> = ({ params }) => {
  const { id: userId } = params; // Extract userId from params
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Manage error state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/${userId}/orders`
        );
        setOrders(response.data.orders);
      } catch (error) {
        setError("Failed to load orders."); // Set error message
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  
  // Display error if exists
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Your Orders
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-2">
              Order ID: {order._id}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Total Amount:</span> ₹{order.totalAmount}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Status:</span> {order.status}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <span className="font-medium">Ordered on:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <a
              href={order.paymentLink}
              className="text-primary underline text-sm mb-3 block hover:text-primary-dark dark:hover:text-primary-light"
            >
              Payment Link
            </a>
            <a
              href={`/orders/${order._id}`}
              className="text-blue-500 hover:text-blue-700 underline text-sm"
            >
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

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
        setError((error as Error).message); // Cast error to Error object
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            role="status"
            className="box-content flex w-fit animate-pulse flex-row rounded border border-gray-200 p-4 shadow md:p-6 dark:border-gray-700"
          >
            <div className="flex h-48 w-64 flex-row items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
              </svg>
            </div>
            <div className="flex w-auto flex-col px-4">
              <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="w-20 flex flex-row gap-4">
              <div className="mb-2.5 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2.5 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
        </div>
      </div>
    );
  }
  
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

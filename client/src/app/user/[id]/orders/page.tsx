'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Order = {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:2560/api/v1/users/${userId}/orders`);
        setOrders(response.data.orders);
      } catch (error) {
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="font-semibold">Order ID: {order._id}</h2>
            <p>Total Amount: ${order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <p>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>
            <a href={`/orders/${order._id}`} className="text-blue-500 underline">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

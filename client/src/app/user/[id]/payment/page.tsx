"use client"; // Ensure this is at the top to use client-side features like useRouter

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    const loadingElements = [];

    // Using a for loop to generate JSX elements
    for (let i = 0; i < 1; i++) {
      loadingElements.push(
        <div
          key={i}
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
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {loadingElements}
        </div>
      </div>
    );
  }

  const handleProceedToPayment = () => {
    const order = orderData[0]; // Assuming there is at least one order
    if (order) {
      const amount = order.totalAmount;
      const formattedAmount = amount.toFixed(1);
      const orderId = order._id;

      // Redirect to the initiate payment URL with the amount as a query parameter
      router.push(
        `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/proceed/${orderId}?amount=${formattedAmount}`
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Order Summary
      </h2>

      <ul className="space-y-4">
        {orderData.map((order, index) => (
          <li
            key={index}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
          >
            {order.items.map((item) => (
              <p key={item.foodId} className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">{item.foodId}</span> - Quantity:{" "}
                {item.quantity} - Price: ₹{item.price}
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

"use client";
import { useState } from "react";

const dataStore = [
    {
      foodId: "651c312be55f123456789abc",
      name: "Chicken Tikka Masala",
      price: 12.99,
      description: "A classic Indian dish made with grilled chicken in a creamy tomato sauce.",
      rating: 4.7,
      ratingCount: 150,
      image: "https://example.com/chicken-tikka.jpg",
    },
    {
      foodId: "651c312be55f123456789def",
      name: "Paneer Butter Masala",
      price: 10.99,
      description: "A rich and creamy curry made with paneer cheese in a tomato-based sauce.",
      rating: 4.5,
      ratingCount: 200,
      image: "https://example.com/paneer-butter.jpg",
    },
  ];
  
  // Utility to format currency
  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  
  export default function CartPage() {
    const [cartItems, setCartItems] = useState(dataStore);
  
    // Calculate total price of cart items
    const calculateTotal = () =>
      cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
  
    // Function to handle incrementing the item quantity
    const handleIncrement = (id: string) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.foodId === id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    };
  
    // Function to handle decrementing the item quantity
    const handleDecrement = (id: string) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.foodId === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    };
  
    // Remove an item from the cart
    const handleRemove = (id: string) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.foodId !== id));
    };
  
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 shadow-xl p-4">
            <h2 className="text-2xl font-bold my-4">Cart ({cartItems.length} items)</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.foodId} className="store-item border-b pb-4 mb-4 flex h-72">
                  <img
                    className="image-store object-cover rounded-lg w-1/2 h-full"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="content w-1/3 flex items-start flex-col px-4 gap-1 justify-between">
                    <div>
                      <h4 className="text-lg font-semibold mt-2">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm text-gray-400">
                        Rating: {item.rating} ({item.ratingCount} reviews)
                      </p>
                    </div>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleRemove(item.foodId)}
                    >
                      Remove
                    </button>
                  </div>
  
                  <div className="mt-2 flex items-center justify-between flex-col">
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 py-1 bg-gray-300"
                        onClick={() => handleDecrement(item.foodId)}
                      >
                        -
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button
                        className="px-2 py-1 bg-gray-300"
                        onClick={() => handleIncrement(item.foodId)}
                      >
                        +
                      </button>
                    </div>
                    <h5>{formatCurrency(item.price)}</h5>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h4 className="text-lg font-semibold">Cart Summary</h4>
            <div className="mt-4 flex justify-between">
              <p>Subtotal:</p>
              <p>{formatCurrency(calculateTotal())}</p>
            </div>
            <div className="mt-2 flex justify-between">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <hr className="my-2" />
            <div className="mt-4 flex justify-between font-bold">
              <p>Total:</p>
              <p>{formatCurrency(calculateTotal())}</p>
            </div>
            <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    );
  }
"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/CartItem";
import axios from "axios";
import Image from "next/image";

interface CartItemType {
  foodId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  quantity: number;
  restaurantId: string; // Added restaurantId for grouping items
}

const formatCurrency = (number: number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CartPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id: userId } = params;

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the cart items when the component is mounted
  const fetchCartItems = async () => {
    if (userId) {
      const API_URL = `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/${userId}/cart`;

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (!data || !data.length) {
          setError("Your cart is empty.");
        }

        // Initialize quantity to 1 if not present
        const cartData = data.map((item: CartItemType) => ({
          ...item,
          quantity: item.quantity || 1,
        }));

        setCartItems(cartData); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Helper function to send updated cart to the server
  const updateCartOnServer = async (updatedCart: CartItemType[]) => {
    const API_URL = `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/${userId}/cart`;

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Cart updated successfully on the server");
      } else {
        console.error("Failed to update cart on the server");
      }
    } catch (error) {
      console.error("Error updating cart on the server:", error);
    }
    fetchCartItems();
  };

  // Handle increment
  const handleIncrement = (id: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.foodId === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  // Handle decrement
  const handleDecrement = (id: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems
        .map((item) =>
          item.foodId === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      updateCartOnServer(updatedCart);
      return updatedCart;
    });
  };

  // Handle item removal
  const handleRemove = async (id: string) => {
    const API_URL = `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/${userId}/cart/${id}`;

    try {
      const response = await fetch(API_URL, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        console.log("Item removed from cart successfully");
        // Update local cart state after successful deletion
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.foodId !== id)
        );
      } else {
        console.error("Failed to remove item from cart");
      }
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCheckout = async () => {
    if (!userId) {
      setError("User information is missing.");
      return;
    }

    // Calculate total amount from cart items
    const totalAmount = calculateTotal(); // Get total amount

    // Ensure restaurantId is available
    const restaurantId = cartItems[0]?.restaurantId; // Assuming all items are from the same restaurant
    if (!restaurantId) {
      setError("Restaurant information is missing.");
      return;
    }

    try {
      // Create the order by calling the backend
      const orderData = {
        userId,
        restaurantId,
        totalAmount,
        items: cartItems.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_FE_URL}/api/v1/users/${userId}/orders`,
        orderData
      );

      // If order creation is successful
      if (response.status === 201) {
        const orders = response.data.orders;

        // Store order JSON data in localStorage to be used on the payment page
        localStorage.setItem("orderData", JSON.stringify(orders));

        // Redirect to the payment page
        const redirectToPaymentPage = `${process.env.NEXT_PUBLIC_APP_FE_URL}/user/${userId}/payment`;
        window.location.href = redirectToPaymentPage;
      } else {
        setError("Failed to create order. Please try again.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      setError("An error occurred during order creation.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    const loadingElements = [];

    // Using a for loop to generate JSX elements
    for (let i = 0; i < 4; i++) {
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

  if (error) {
    return (
      <>
      <div className="h-2xl w-full mx-auto">
        <Image
          src="/assets/emptycart.png"
          alt="empty cart"
          width={1000}
          height={1000}
          className="h-2xl w-2xl object-cover mx-auto"
        />
      </div></>
      
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 shadow-xl p-4">
          <h2 className="text-2xl font-bold my-4">
            Cart ({cartItems.length} items)
          </h2>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.foodId}
                item={item}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onRemove={handleRemove}
                formatCurrency={formatCurrency}
              />
            ))
          ) : (
            <div className="h-2xl w-full mx-auto">
        <Image
          src="/assets/emptycart.png"
          alt="empty cart"
          width={1000}
          height={1000}
          className="h-2xl w-2xl object-cover mx-auto"
        />
      </div>
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
          <button
            onClick={handleCheckout}
            className="w-full mt-4 py-2 bg-blue-500 text-white rounded"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

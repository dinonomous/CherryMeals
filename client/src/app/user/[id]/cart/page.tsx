"use client";
import { useState, useEffect } from "react";
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";

interface CartItemType {
  foodId: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  ratingCount: number;
  image: string;
  quantity: number; // Added quantity property
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

  // Fetch the cart items when the component is mounted
  const fetchCartItems = async () => {
    if (userId) {
      const API_URL = `http://localhost:2560/api/v1/users/${userId}/cart`;

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        // Initialize quantity to 1 if not present
        const cartData = data.map((item: CartItemType) => ({
          ...item,
          quantity: item.quantity || 1,
        }));

        setCartItems(cartData); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCartItems();
  }, []);

  // Helper function to send updated cart to the server
  const updateCartOnServer = async (updatedCart: CartItemType[]) => {
    const API_URL = `http://localhost:2560/api/v1/users/${userId}/cart`;

    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: updatedCart }), // Send updated cart items
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
        item.foodId === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
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
    const API_URL = `http://localhost:2560/api/v1/users/${userId}/cart/${id}`;

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

  const calculateTotal = () => {
    // Calculate total price based on item price and quantity
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  if (loading) {
    return <p>Loading cart...</p>;
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
};

export default CartPage;

import React from "react";

interface CartItemProps {
  item: {
    foodId: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    ratingCount: number;
    image: string;
    quantity: number; // Ensure quantity is a part of the item
  };
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  formatCurrency: (number: number) => string;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
  formatCurrency,
}) => {
  return (
    <div className="store-item border-b pb-4 mb-4 flex h-72">
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
          onClick={() => onRemove(item.foodId)}
        >
          Remove
        </button>
      </div>

      <div className="mt-2 flex items-center justify-between flex-col">
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-gray-300"
            onClick={() => onDecrement(item.foodId)}
          >
            -
          </button>
          <span>{item.quantity}</span> {/* Display the correct quantity */}
          <button
            className="px-2 py-1 bg-gray-300"
            onClick={() => onIncrement(item.foodId)}
          >
            +
          </button>
        </div>
        <h5>{formatCurrency(item.price * item.quantity)}</h5> {/* Show total price */}
      </div>
    </div>
  );
};

export default CartItem;

import React from 'react';
import Image from 'next/image';
import axios from 'axios';


interface RestaurantCardProps {
  title: string;
  restaurantName: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  imageUrl: string;
  itemKey: string;
  onRemove: (itemKey: string) => void; // Function to handle removal
  onAddFood: () => void; // Function to handle adding a food item
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  restaurantName,
  description,
  price,
  deliveryTime,
  rating,
  imageUrl,
  itemKey,
  onRemove,
  onAddFood,
}) => {

  const handleRemoveClick = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/food/${itemKey}`);
      if (response.status === 200) {
        onRemove(itemKey); // Call the remove handler
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="max-w-[350px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" key={itemKey}>
      <Image
        src={imageUrl}
        alt="Card Image"
        width={350}
        height={100}
        className="w-full h-auto rounded-t-xl"
      />
      <div className="p-4 md:p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
        <div className="flex items-center">
          <Image src="/assets/star.svg" alt="Star" width={16} height={16} />
          <span className="ml-1">({rating.toFixed(1)})</span>
        </div>
        <h2 className="text-base font-bold text-gray-800 dark:text-white">{restaurantName}</h2>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{description}</p>
        <div className="flex items-center justify-between">
          <h2>{price}</h2>
          <div className="flex items-center">
            <i className="bi bi-dot"></i>
            <span>{deliveryTime}</span>
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none"
            onClick={handleRemoveClick}
          >
            Remove
          </button>
          <button
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none"
            onClick={onAddFood}
          >
            Add Food Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;

import React from 'react';
import Image from 'next/image';

interface RestaurantCardProps {
  title: string;
  restaurantName: string;
  description: string;
  price: string;
  rating: number;
  imageUrl: string;
  itemKey: string;
  onRemove: (itemKey: string) => void; // Function to handle removal
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  title,
  restaurantName,
  description,
  price,
  rating,
  imageUrl,
  itemKey,
  onRemove,
}) => {
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
        <h2 className="text-base font-bold text-gray-800 dark:text-white">{restaurantName}</h2>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">{description}</p>
        <div className="flex items-center justify-between">
          <h2>{price}</h2>
          <div className="flex items-center">
            <Image src="/assets/star.svg" alt="Star" width={16} height={16} />
            <span className="ml-1">({rating})</span>
          </div>
        </div>
        <button
          onClick={() => onRemove(itemKey)} // Call the remove function
          className="mt-2 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default RestaurantCard;

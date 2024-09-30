import React from 'react';

interface Restaurant {
    _id: string;
    name: string;
    rating: number;
  }

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({ restaurant }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{restaurant.name}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-600 text-sm">
          Rating: {restaurant.rating} ⭐
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;

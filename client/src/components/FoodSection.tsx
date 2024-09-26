"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./foodCard";

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  imageUrl?: string; 
}

const FoodSection: React.FC<{ id?: string | null }> = ({ id }) => {
  const [topFood, setTopFood] = useState<Food[]>([]); // Use the correct type for food items
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          id 
            ? `http://localhost:2560/api/v1/restaurant/nofooditems/${id}/menue` 
            : "http://localhost:2560/api/v1/homepage/TopFood"
        );
        setTopFood(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]); // Ensure useEffect runs when id changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-2 my-12">
      <h2 className="text-xl">Favorite Foods</h2>
      <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8">
        {topFood.map((food) => (
          <Card
            key={food._id} // Ensure unique key for each card
            title={food.name}
            imageUrl={id ? food.imageUrl : "/assets/image.png"} // Use food.imageUrl if id exists
            restaurantName="The Spice House" // Consider making this dynamic as well
            description={food.description}
            price={`Rs ${food.price.toFixed(2) || "0.00"}`}
            deliveryTime="15-20 mins"
            rating={food.rating || 0}
            itemKey={food._id}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;

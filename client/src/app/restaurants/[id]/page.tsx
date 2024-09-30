"use client";

import React, { useEffect, useState } from "react";
import RestaurantCard from "../../../components/Reastrauntcard"; // Ensure the path is correct
import FoodSection from "@/components/FoodSection";

interface Restaurant {
  _id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
}

// Define Restaurant Response to avoid any type
interface RestaurantResponse {
  _id: string;
  name: string;
  address: string;
  description: string;
  rating: number;
}

const RestaurantPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params; // Get the id from params

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/nofooditems/${id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
          }
          const data: RestaurantResponse = await response.json(); // Use RestaurantResponse type here
          setRestaurant(data); 
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchRestaurant();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!restaurant) return <div>No restaurant found.</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      </div>
      <FoodSection id={id} />
    </>
  );
};

export default RestaurantPage;
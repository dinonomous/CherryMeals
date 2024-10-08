"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Card from "./foodCard";

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  imageUrl?: string;
  itemKey: string;
  restaurantName: string;
}

const FoodSection: React.FC<{ id?: string | null }> = ({ id }) => {
  const [topFood, setTopFood] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUid(storedUserId);
    }
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          id
            ? `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/nofooditems/${id}/menue`
            : `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/homepage/topfood`
        );
        setTopFood(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFood();
  }, [id]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-2 my-12">
        <h2 className="text-xl">Favorite Foods</h2>
        <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8"></div>
        {/* Loading Skeleton */}
        <div className="max-w-7xl mx-auto p-2">
          <div className="flex gap-8 mt-4 overflow-x-auto no-scrollbar scroll-snap-x">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-96 p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
              >
                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  </svg>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (foodId: string) => {
    if (!uid) {
      router.push("/login");
    } else {
      console.log(`Adding food with ID ${foodId} to cart`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-2 my-8">
      <h1 className="text-3xl font-semibold mx-2">{id? "Restaurant Menue":"Favorite Foods"}</h1>
      <div className="foodsection justify-between md:gap-4 items-center my-8 flex-1 grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2 dark:bg-zinc-900 rounded-2xl p-1">
        {topFood.map((food) => (
          <Card
            key={food._id}
            title={food.name}
            imageUrl={food.imageUrl || ""} // Ensure imageUrl is always provided
            restaurantName={food.restaurantName || "not provided"}
            description={food.description}
            price={`Rs ${food.price.toFixed(2) || "0.00"}`}
            deliveryTime="15-20 mins"
            rating={food.rating || 0}
            itemKey={food._id}
            userId={uid}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;

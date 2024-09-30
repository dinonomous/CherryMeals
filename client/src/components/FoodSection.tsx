"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // For redirection
import Card from "./foodCard";
require("dotenv").config();

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  imageUrl?: string;
  itemKey: string;
  id: String;
}

const getCookie = (cookieName: string) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const FoodSection: React.FC<{ id?: string | null }> = ({ id }) => {
  const [topFood, setTopFood] = useState<Food[]>([]); // Use the correct type for food items
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState<string | null>(null); // Initialize uid as null by default
  const router = useRouter();

  // Check for user ID from cookies on component mount
  useEffect(() => {
    const userid = getCookie("userid");
    if (userid) {
      setUid(userid);
    }
  }, []);

  // Fetch food items
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          id
            ? `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/nofooditems/${id}/menue`
            : `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/homepage/topfood`
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
  }, [id]);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-2 my-12">
        <h2 className="text-xl">Favorite Foods</h2>
        <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8"></div>
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

  // Function to handle clicks on the "Add to Cart" button
  const handleAddToCart = (foodId: string) => {
    if (!uid) {
      router.push("/login"); // Redirect to login page if user is not logged in
    }
  };
  console.log(topFood);

  return (
    <div className="max-w-7xl mx-auto p-2 my-12">
      <h2 className="text-xl">Favorite Foods</h2>
      <div className="foodsection flex flex-wrap gap-8 md:gap-4 items-center justify-center my-8">
        {topFood.map((food) => (
          <Card
            key={food.id || food._id} // Use food._id if available, otherwise use food.foodId
            title={food.name}
            imageUrl={food.imageUrl} // Use food.imageUrl if id exists
            restaurantName="The Spice House" // Consider making this dynamic as well
            description={food.description}
            price={`Rs ${food.price.toFixed(2) || "0.00"}`}
            deliveryTime="15-20 mins"
            rating={food.rating || 0}
            itemKey={food.id || food._id} // Use food._id if available, otherwise use food.foodId
            userId={uid} // Pass uid to Card component
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodSection;

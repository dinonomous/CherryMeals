"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // For redirection
import Card from "./foodCard";

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
            ? `http://localhost:2560/api/v1/restaurant/nofooditems/${id}/menue`
            : "http://localhost:2560/api/v1/homepage/topfood"
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
      <div className="flex justify-center items-center h-screen">
        <div className="loader" />
        <p>Loading...</p>
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
      <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8">
        {topFood.map((food) => (
          <Card
            key={food.id || food._id} // Use food._id if available, otherwise use food.foodId
            title={food.name}
            imageUrl={id ? food.imageUrl : "/assets/image.png"} // Use food.imageUrl if id exists
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

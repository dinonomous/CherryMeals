'use client';

import React,{useState, useEffect} from "react";
import axios from 'axios';
import Image from "next/image";
import Card from "./foodCard";

const FoodSection = () => {
  const [topfood, settopfood] = useState<any[]>([]); // Use the correct type for restaurants
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:2560/api/v1/homepage/TopFood');
        settopfood(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-2 my-12">
        <h2 className="text-xl text">Favourate foods</h2>
        <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8">
            {topfood.map((food)=>(
                <Card
                title={food.name}
                restaurantName="The Spice House"
                description={food.description}
                price={`Rs ${food.price.toFixed(2) || "0.00"}`}
                deliveryTime="15-20 mins"
                rating={food.rating || 0}
                imageUrl="/assets/image.png"
                itemKey={food._id}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default FoodSection;

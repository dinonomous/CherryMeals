"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const CardSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]); // Use the correct type for restaurants
  const [loading, setLoading] = useState(true);

  // Function to scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust the scroll distance
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Adjust the scroll distance
        behavior: "smooth", // Smooth scroll effect
      });
    }
  };

  // Fetch data from the API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2560/api/v1/homepage/nofooditems"
        );
        setRestaurants(response.data);
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
    <div className="max-w-7xl mx-auto p-2">
      <div className="relative">
        <div className="flex items-center">
          <h2 className="text-black font-semibold mr-auto">
            Top Restaurants Near SRM
          </h2>
          <button
            className="bg-gray-100 rounded-full text-black p-2 ml-2"
            onClick={scrollLeft}
          >
            <Image
              src="/assets/arrow-left.svg"
              alt="Scroll Left"
              width={16}
              height={16}
            />
          </button>
          <button
            className="bg-gray-100 rounded-full text-black p-2 ml-2"
            onClick={scrollRight}
          >
            <Image
              src="/assets/arrow-right.svg"
              alt="Scroll Right"
              width={16}
              height={16}
            />
          </button>
        </div>
        <div
          className="flex gap-8 mt-4 overflow-x-auto no-scrollbar scroll-snap-x"
          ref={containerRef}
        >
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="transform transition-transform hover:scale-95 min-w-[350px]"
            >
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src={restaurant.image}
                  alt={restaurant.name}
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  {restaurant.discount || "No Discounts"}
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">{restaurant.name}</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">({restaurant.rating})</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i>{" "}
                  {restaurant.deliveryTime || "20-30 mins"}
                </div>
              </div>
              <p className="text-sm mt-1">{restaurant.shortDescription}</p>
              <p className="text-sm">{restaurant.location || "India"}</p>
              <Link
                href={`/restaurants/${restaurant._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardSlider;

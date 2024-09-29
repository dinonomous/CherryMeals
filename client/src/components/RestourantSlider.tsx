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
              className="transform transition-transform hover:scale-95 min-w-[350px] rounded-lg"
            >
              <div className="relative">
                <Image
                  src="/assets/hotels.png"
                  alt={restaurant.name}
                  width={350}
                  height={200}
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  {restaurant.discount || "No Discounts"}
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">{restaurant.name}</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center rounded-lg">
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

'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const PartnerButton = () => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const router = useRouter(); // Use the router for manual navigation

  useEffect(() => {
    const fetchRestaurantId = async () => {
      try {
        const response = await fetch('http://localhost:2560/api/v1/auth/restaurant/checkAuth', {
          method: 'GET',
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant ID");
        }
        const data = await response.json();
        if (data.success) {
          setRestaurantId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching restaurant ID:", error);
      }
    };

    fetchRestaurantId();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!restaurantId) {
      e.preventDefault(); // Prevent navigation if no restaurant ID is available
    } else {
      router.push(`/restaurant/${restaurantId}/dashboard`); // Navigate to restaurant dashboard
    }
  };

  return (
    <>
      {restaurantId ? (
        <a
          href="#"
          onClick={handleClick} // Add onClick handler for conditional navigation
          className="font-medium transition duration-300 ease-in-out text-black dark:text-whiteCustom hover:text-primary"
          aria-current="page"
        >
          Restaurant Dashboard
        </a>
      ) : (
        <span className="font-medium text-gray-400 dark:text-gray-400 hover:cursor-not-allowed">
          Restaurant Dashboard
        </span>
      )}
    </>
  );
};

export default PartnerButton;

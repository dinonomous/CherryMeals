'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const PartnerButton = () => {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

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

  return (
    <>
      {restaurantId ? (
        <Link
          href={`/restaurant/${restaurantId}/dashboard`}
          className="font-medium transition duration-300 ease-in-out text-black dark:text-whiteCustom hover:text-primary"
          aria-current="page"
        >
          Restaurant Dashboard
        </Link>
      ) : (
        <span className="font-medium text-gray-400 dark:text-gray-400 hover:cursor-not-allowed">
          Restaurant Dashboard
        </span>
      )}
    </>
  );
};

export default PartnerButton;

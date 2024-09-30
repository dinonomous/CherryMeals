'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import Next.js router

const Cartbutton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
  const [userId, setUserId] = useState<string | null>(null); // State to track the user ID
  const router = useRouter(); // Use Next.js router for navigation

  // Function to check if the user is authenticated
  const checkAuth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/checkAuth`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        setIsLoggedIn(true);
        setUserId(data.userId); 
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsLoggedIn(false); 
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isLoggedIn || !userId) {
      e.preventDefault(); 
      alert('You need to be logged in to access the cart.');
    } else {
      router.push(`/user/${userId}/cart`); 
    }
  };

  return (
    <>
      <a
        href="#"
        onClick={handleClick} // Handle click with router.push
        className={`font-medium transition duration-300 ease-in-out ${isLoggedIn ? "text-black dark:text-whiteCustom" : "text-gray-400 hover:cursor-not-allowed dark:text-gray-400"} hover:text-primary`}
        aria-current="page"
      >
        Cart
      </a>
    </>
  );
};

export default Cartbutton;

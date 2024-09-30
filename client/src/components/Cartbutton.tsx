'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 

const Cartbutton = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!userId) {
      e.preventDefault(); 
      alert('You need to be logged in to access the cart.');
    } else {
      router.push(`/user/${userId}/cart`); // Navigate to cart page based on user ID
    }
  };

  return (
    <>
      <a
        href="#"
        onClick={handleClick} // Handle click with router.push
        className={`font-medium transition duration-300 ease-in-out ${userId ? "text-black dark:text-whiteCustom" : "text-gray-400 hover:cursor-not-allowed dark:text-gray-400"} hover:text-primary`}
        aria-current="page"
      >
        Cart
      </a>
    </>
  );
};

export default Cartbutton;

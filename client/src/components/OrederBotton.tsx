'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 

const getCookie = (cookieName: string) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const OrderButton = () => {
  const [uid, setUid] = useState<string | null>(null);
  const router = useRouter(); // Use the Next.js router for navigation

  useEffect(() => {
    const userid = getCookie("userid");
    if (userid) {
      setUid(userid);
    }
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!uid) {
      e.preventDefault(); // Prevent navigation if user ID is not available
    } else {
      router.push(`/user/${uid}/orders`); // Navigate programmatically if UID exists
    }
  };

  return (
    <a
      href="#"
      onClick={handleClick} // Add the click handler to manage conditional navigation
      className={`font-medium transition duration-300 ease-in-out ${uid ? "text-black dark:text-whiteCustom" : "text-gray-400 hover:cursor-not-allowed dark:text-gray-400"} hover:text-primary`}
      aria-current="page"
    >
      Orders
    </a>
  );
};

export default OrderButton;

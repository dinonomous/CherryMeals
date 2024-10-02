"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const UserControls = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    if (sessionStorage.getItem("userId") || sessionStorage.getItem("restaurantId")) {
      setIsLoggedIn(true);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/checkAuth`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem("userId", data.userId);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          sessionStorage.removeItem("userId");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false);
        sessionStorage.removeItem("userId");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data.success) {
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("restaurantId");
        window.location.reload();
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLogout}
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Logout
          </button>
          <Link href="/dashboard">
            <button
              type="button"
              className="text-white bg-gray-100 hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-2.5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Image
              src="/assets/user.svg"
              alt="Scroll Left"
              width={16}
              height={16}
            />
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="ml-4">
            <button
              type="button"
              className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Login
            </button>
          </Link>
          <Link href="/register">
            <button
              type="button"
              className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default UserControls;

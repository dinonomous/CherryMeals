'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";


const UserControls = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/checkAuth`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('userId', data.userId);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        sessionStorage.removeItem('userId');
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsLoggedIn(false);
      sessionStorage.removeItem('userId');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
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
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Logout
          </button>
          <Link href="/dashboard">
            <button
              type="button"
              className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.478 22 2 17.522 2 12S6.478 2 12 2s10 4.478 10 10-4.478 10-10 10zm-1-14v-2h2v2h-2zm0 4v6h2v-6h-2z"/>
              </svg>
              Dashboard
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login" className="ml-4">
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Login
            </button>
          </Link>
          <Link href="/register">
            <button
              type="button"
              className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

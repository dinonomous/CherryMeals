"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
require("dotenv").config();

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingImage, setLoadingImage] = useState(true); // State to track image loading
  const router = useRouter();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.APP_BE_URL}/api/v1/auth/checkAuth`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          router.push("/");
        }
      } catch (err) {
        console.error("Error checking auth:", err);
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.APP_BE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log("Login successful!", data);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <>
      <span className="flex h-[80vh]">
        <div className="w-full md:w-1/2 pr-7 flex flex-col justify-center box-border">
          <h2 className="font-bold text-blackCustom dark:text-whiteCustom text-center text-4xl">
            Login
          </h2>
          <p className="mt-4 text-blackCustom dark:text-whiteCustom text-center text-xl">
            If you have an account, please login
          </p>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-blackCustom dark:text-whiteCustom" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-blackCustom dark:text-whiteCustom" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-blackCustom dark:text-whiteCustom hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-500" />
          </div>

          <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48">
              <defs>
                <path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                />
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible" />
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
            </svg>
            <span className="ml-4">Login with Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you don't have an account...</p>
            <Link href="/register">
              <button
                type="button"
                className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">Are you a Partner?</p>
            <hr className="border-gray-500" />
          </div>
          <div className="py-4 items-center justify-center flex">
            <Link href="/partnerlogin">
              <button
                type="button"
                className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Partner Login
              </button>
            </Link>
            <Link href="/partnerlogin">
              <button
                type="button"
                className="text-white bg-primary hover:bg-tertiary hover:text-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Partner Sign up
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-1/2 hidden md:block h-full">
          {loadingImage && (
            <div role="status" className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
              <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                <path d="M0 2.5C0 1.1 1.1 0 2.5 0h11C14.9 0 16 1.1 16 2.5v15C16 18.9 14.9 20 13.5 20h-11C1.1 20 0 18.9 0 17.5v-15ZM2.5 1C1.7 1 1 1.7 1 2.5v15c0 .8.7 1.5 1.5 1.5h11c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5h-11Z"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <Image
            src="/assets/login.jpg"
            alt="Login Banner"
            layout="fill"
            objectFit="cover"
            onLoad={() => setLoadingImage(false)} // Update loading state on image load
            className="rounded-l-lg"
          />
        </div>
      </span>
    </>
  );
};

export default LoginForm;

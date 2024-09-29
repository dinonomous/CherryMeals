'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; // Import Next.js router

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

const Cartbutton = () => {
    const [uid, setUid] = useState<string | null>(null);
    const router = useRouter(); // Use Next.js router for navigation

    useEffect(() => {
        const userid = getCookie("userid");
        if (userid) {
            setUid(userid);
        }
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!uid) {
            e.preventDefault(); // Prevent navigation if no user ID is available
        } else {
            router.push(`/user/${uid}/cart`); // Navigate to cart page based on user ID
        }
    };

    return (
        <>
            <a
                href="#"
                onClick={handleClick} // Handle click with router.push
                className={`font-medium transition duration-300 ease-in-out ${uid ? "text-black dark:text-whiteCustom" : "text-gray-400 hover:cursor-not-allowed dark:text-gray-400"} hover:text-primary`}
                aria-current="page"
            >
                Cart
            </a>
        </>
    );
};

export default Cartbutton;

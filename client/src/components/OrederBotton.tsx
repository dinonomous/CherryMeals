'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const getCookie = (cookieName:String) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

const OrderButton = () => {
    const [uid,setuid]=useState(String)
    useEffect(() => {
        const userid = getCookie("userid");
        if (userid) {
            setuid(userid);
            }
    }, [])
    
  return (
    <>
      <Link
        href={`user/${uid}/orders`}
        // set the text colour and hover none and on click nothing based on uid state
        className={`font-medium transition duration-300 ease-in-out ${uid ? "text-black dark:text-whiteCustom" : "text-gray-400 hover:cursor-not-allowed dark:text-gray-400"} hover:text-primary`}
        aria-current="page"
      >
        Orders
      </Link>
    </>
  );
};

export default OrderButton;

"use client";
// src/components/CardSlider.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const CardSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300, // Adjust the scroll distance
        behavior: 'smooth', // Smooth scroll effect
      });
    }
  };

  // Function to scroll to the right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300, // Adjust the scroll distance
        behavior: 'smooth', // Smooth scroll effect
      });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto p-2">
        <div className="relative">
          <div className="flex items-center">
            <h2 className="text-black font-semibold mr-auto">
              Top restaurant Near SRM
            </h2>
            <button className="bg-gray-100 rounded-full text-black p-2 ml-2 " onClick={scrollLeft}>
              <Image src="/assets/arrow-left.svg" alt="Star" width={16} height={16} />
            </button>
            <button className="bg-gray-100 rounded-full text-black p-2 ml-2" onClick={scrollRight}>
            <Image src="/assets/arrow-right.svg" alt="Star" width={16} height={16} />
            </button>
          </div>
          <div className="flex gap-8 mt-4 overflow-x-auto no-scrollbar scroll-snap-x" ref={containerRef}>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
            <div className="transform transition-transform hover:scale-95 min-w-[350px]">
              <div className="relative">
                <img
                  className="w-[350px] h-[240px] object-cover rounded-xl"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/be4h2xc9cqcugdjydotn"
                  alt=""
                />
                <div className="absolute bottom-0 left-2 text-white font-bold text-2xl">
                  20% OFF UPTO ₹50
                </div>
              </div>
              <h3 className="font-bold text-xl mt-2">Restaurant Name</h3>
              <div className="flex justify-between text-base">
                <div className="flex items-center">
                  <Image
                    src="/assets/star.svg"
                    alt="Star"
                    width={16}
                    height={16}
                  />
                  <span className="ml-1">(4.6)</span>
                </div>
                <div className="flex items-center">
                  <i className="bi bi-dot"></i> 15-20 mins
                </div>
              </div>
              <p className="text-sm mt-1">Short description</p>
              <p className="text-sm">India</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSlider;

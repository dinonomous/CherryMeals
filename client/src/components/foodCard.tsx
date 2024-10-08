import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  restaurantName: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  imageUrl: string;
  itemKey: string;
  userId: string | null;
  onAddToCart: (foodId: string) => void; // Add this line
}


const Card: React.FC<CardProps> = ({
  title,
  restaurantName,
  description,
  price,
  deliveryTime,
  rating,
  imageUrl,
  itemKey,
  userId,
}) => {
  const onAddToCart = async () => {
    if (!userId) {
      window.location.href = "/login"; // Redirect to login if user is not logged in
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/users/${userId}/cart/${itemKey}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Item added to cart:", data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleAddToCartClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault(); // Prevent default anchor behavior
    onAddToCart(); // Call the function
  };

  return (
    <div
      className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 p-2 m-2 flex-auto"
      key={itemKey}
    >
      <Image
        src={imageUrl}
        alt="Card Image"
        width={350}
        height={100}
        className="w-full max-h-72 rounded-t-xl sm:h-96 object-cover"
      />
      <div className="p-4 md:p-2 ">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
        <div className="flex items-center">
          <Image src="/assets/star.svg" alt="Star" width={16} height={16} />
          <span className="ml-1">({rating.toFixed(1)})</span>
        </div>
        <h2 className="text-base font-bold text-gray-800 dark:text-white">
          {restaurantName}
        </h2>
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <h2>{price}</h2>
          <div className="flex items-center">
            <i className="bi bi-dot"></i>
            <span>{deliveryTime}</span>
          </div>
        </div>
        <div className="flex space-x-2 mt-2">
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-primary text-white hover:bg-tertiary hover:text-black focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
            onClick={handleAddToCartClick}
            style={{ pointerEvents: userId ? "auto" : "none", opacity: userId ? 1 : 0.5 }}
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

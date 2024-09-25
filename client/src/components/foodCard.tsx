import { stringifyError } from 'next/dist/shared/lib/utils';
import Image from 'next/image';

interface CardProps {
  title: string;
  restaurantName: string;
  description: string;
  price: string;
  deliveryTime: string;
  rating: number;
  imageUrl: string;
  itemKey: string;
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
}) => {

  const addToCart = (a: string) => {
    console.log(a);
  }

  const handleAddToCartClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    addToCart(itemKey);
  }

  return (
    <div className="max-w-[350px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70" key={itemKey}>
      {/* Image */}
      <Image
        src={imageUrl}
        alt="Card Image"
        width={350}
        height={100}
        className="w-full h-auto rounded-t-xl"
      />

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center">
          <Image
            src="/assets/star.svg"
            alt="Star"
            width={16}
            height={16}
          />
          <span className="ml-1">({rating.toFixed(1)})</span>
        </div>

        {/* Restaurant Name */}
        <h2 className="text-base font-bold text-gray-800 dark:text-white">
          {restaurantName}
        </h2>

        {/* Description */}
        <p className="mt-1 text-gray-500 dark:text-neutral-400">
          {description}
        </p>

        {/* Price and Delivery Time */}
        <div className="flex items-center justify-between">
          <h2>{price}</h2>
          <div className="flex items-center">
            <i className="bi bi-dot"></i>
            <span>{deliveryTime}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-2 mt-2">
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-tertiary hover:text-black focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
          >
            Order Now
          </a>
          <a
            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white hover:bg-tertiary hover:text-black focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
            onClick={handleAddToCartClick} // Updated click handler
          >
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;

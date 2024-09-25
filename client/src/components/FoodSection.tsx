import React from "react";
import Image from "next/image";
import Card from "./foodCard";

const FoodSection = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto p-2 my-12">
        <h2 className="text-xl text">Favourate foods</h2>
        <div className="foodsection flex flex-wrap gap-8 items-center justify-center my-8">
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
          <Card
            title="Best Restaurant"
            restaurantName="The Spice House"
            description="Some quick example text to build on the card title and make up the bulk of the card's content."
            price="Rs 314"
            deliveryTime="15-20 mins"
            rating={4.6}
            imageUrl="/assets/image.png"
          />
        </div>
      </div>
    </>
  );
};

export default FoodSection;

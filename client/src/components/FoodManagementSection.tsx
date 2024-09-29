import React, { useState, useEffect } from 'react';
import RestaurantCard from './Reastrauntcard';
import axios from 'axios';

const FoodManagementSection = () => {
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:2560/api/v1/restaurant/fooditems');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Remove a food item
  const handleRemove = (itemKey: string) => {
    setFoodItems((prevItems) => prevItems.filter(item => item.itemKey !== itemKey));
  };

  // Handle adding a new food item (implement the logic to open a modal or navigate to an add food form)
  const handleAddFood = () => {
    // Implement your logic here
    console.log("Add Food Item clicked");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Food Item Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {foodItems.map(food => (
          <RestaurantCard
            key={food.itemKey}
            title={food.name}
            restaurantName="The Spice House"
            description={food.description}
            price={`Rs ${food.price.toFixed(2)}`}
            deliveryTime="15-20 mins"
            rating={food.rating || 0}
            imageUrl={food.imageUrl || "/assets/image.png"}
            itemKey={food.itemKey}
            onRemove={handleRemove}
            onAddFood={handleAddFood}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodManagementSection;

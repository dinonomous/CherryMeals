import React, { useState, useEffect } from "react";
import RestaurantCard from "./ReastrauntcardR"; // Ensure this path is correct
import axios from "axios";

// Define the Food type
interface Food {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  rating: number;
}

const FoodManagementSection: React.FC = () => {
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAddFoodForm, setShowAddFoodForm] = useState(false); 
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: null as File | null,
    rating: 0, 
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(!sessionStorage.getItem("restaurantId")){
      const fetchRestaurantId = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/auth/restaurant/checkAuth`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch restaurant ID");
          }
          const data = await response.json();
          if (data.success) {
            setUserId(data.userId);
          }
        } catch (error) {
          console.error("Error fetching restaurant ID:", error);
          setError("Failed to authenticate. Please try again.");
        }
      };
  
      fetchRestaurantId();
    }
    else{
      setUserId(sessionStorage.getItem("restaurantId"));
    }
    
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/nofooditems/${userId}/menue`
          );
          setFoodItems(response.data);
        } catch (error) {
          console.error("Error fetching food items:", error);
          setError("Failed to load food items.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFoodItems();
  }, [userId]); 

  // Handle food item removal
  const handleRemove = async (itemKey: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/deletefood/${itemKey}`,
        { withCredentials: true }
      );
      setFoodItems((prevItems) => prevItems.filter((item) => item.id !== itemKey));
      window.location.reload();
    } catch (error) {
      console.error("Error removing food item:", error);
      setError("Failed to remove food item.");
    }
  };

  // Handle adding a new food item
  const handleAddFood = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append("name", newFood.name);
    formData.append("price", newFood.price);
    formData.append("description", newFood.description);
    formData.append("rating", newFood.rating.toString());
    if (newFood.image) {
      formData.append("image", newFood.image);
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_BE_URL}/api/v1/restaurant/addfood/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userId}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFoodItems((prevItems) => [...prevItems, response.data]);
      setNewFood({ name: "", price: "", description: "", image: null, rating: 0 }); // Clear form
      setShowAddFoodForm(false); 
      window.location.reload();
    } catch (error) {
      console.error("Error adding food item:", error);
      setError("Failed to add food item.");
    }
  };

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewFood({ ...newFood, image: e.target.files[0] });
    }
  };

  // Handle rating input change
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFood({ ...newFood, rating: parseFloat(e.target.value) });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Food Item Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foodItems.map((food) => (
            <RestaurantCard
              key={food.id}
              title={food.name}
              restaurantName="The Spice House"
              description={food.description}
              price={`Rs ${food.price}`}
              rating={food.rating || 0}
              imageUrl={food.imageUrl}
              itemKey={food.id}
              onRemove={() => handleRemove(food.id)}
            />
          ))}
          <div
            onClick={() => setShowAddFoodForm(true)}
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 flex justify-center items-center text-gray-700 font-bold border border-dashed border-gray-400 h-48 rounded-lg"
          >
            <span className="text-5xl">+</span>
          </div>
        </div>
      </div>

      {showAddFoodForm && (
        <form onSubmit={handleAddFood} className="mt-4 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold mb-2">Add New Food Item</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              required
              className="border rounded p-1 w-full mb-2"
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newFood.price}
              onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
              required
              className="border rounded p-1 w-full mb-2"
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={newFood.description}
              onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
              required
              className="border rounded p-1 w-full mb-2"
            />
          </div>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={newFood.rating}
              onChange={handleRatingChange}
              min="0"
              max="5"
              step="0.1"
              required
              className="border rounded p-1 w-full mb-2"
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="border rounded p-1 w-full mb-2"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded p-2">
            Add Food Item
          </button>
          <button
            type="button"
            onClick={() => setShowAddFoodForm(false)}
            className="bg-red-500 text-white rounded p-2 ml-2"
          >
            Cancel
          </button>
        </form>
      )}
    </>
  );
};

export default FoodManagementSection;

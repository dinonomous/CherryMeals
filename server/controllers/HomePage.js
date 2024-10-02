const Restaurant = require("../models/RestaurantSchema");
const FoodSchema = require("../models/FoodSchema");
const { getSignedImageUrl } = require("../controllers/imageController");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantsWithOutFoodItems = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    const filteredRestaurants = restaurants.map((obj) => {
      return {
        _id: obj._id,
        name: obj.name,
        address: obj.address,
        isActive: obj.isActive,
        rating: obj.rating,
        image: obj.imageUrl,
      };
    });

    res.json(filteredRestaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantsWithOutFoodItemsId = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id); // Use req.params.id instead of req.id

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const filteredRestaurant = {
      _id: restaurant._id,
      name: restaurant.name,
      description: restaurant.description,
      rating: restaurant.rating,
    };

    res.json(filteredRestaurant); // Return the single restaurant object
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const TopFood = async (req, res) => {
  try {
    const topfood = await FoodSchema.find();

    const response = await Promise.all(
      topfood.map(async (food) => {
        const restaurant = await Restaurant.findById(food.restaurantId);
        return {
          description: food.description,
          foodId: food.foodId,
          imageUrl: food.imageUrl,
          name: food.name,
          price: food.price,
          rating: food.rating,
          ratingCount: food.ratingCount,
          restaurantId: food.restaurantId,
          restaurantName: restaurant ? restaurant.name : "Unknown", // Safely handle missing restaurant
          __v: food.__v,
          _id: food._id,
        };
      })
    );

    res.json(response);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantsWithOutFoodItems,
  TopFood,
  getRestaurantsWithOutFoodItemsId,
};

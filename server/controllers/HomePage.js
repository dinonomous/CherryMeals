const Restaurant = require("../models/RestaurantSchema");
const Topfood = require("../models/TopFoodSchema");

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
        rating: obj.rating,
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
      const topfood = await Topfood.find();
  
      res.json(topfood);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

module.exports = {
  getRestaurants,
  getRestaurantsWithOutFoodItems,
  TopFood,
  getRestaurantsWithOutFoodItemsId
};

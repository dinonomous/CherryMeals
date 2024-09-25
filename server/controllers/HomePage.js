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
};

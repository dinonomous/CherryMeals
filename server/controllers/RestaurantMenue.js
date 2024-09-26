const Restaurant = require("../models/RestaurantSchema");
const FoodSchema = require("../models/FoodSchema");
const { getSignedImageUrl } = require('./imageController');

const menue = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menu = await Promise.all(
      restaurant.foodItems.map(async (foodItem) => {
        const food = await FoodSchema.findById(foodItem.foodId);

        if (!food) {
          return null; 
        }
        return {
          name: food.name,
          imageUrl: getSignedImageUrl(req.params.id, foodItem.foodId),
          price: food.price,
          description: food.description,
          rating: food.rating,
          ratingCount: food.ratingCount
        };
      })
    );

    const filteredMenu = menu.filter(item => item !== null);

    res.json(filteredMenu);
    
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Error fetching menu" });
  }
};

module.exports = {
  menue,
};

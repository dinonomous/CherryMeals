const Restaurant = require("../models/RestaurantSchema");
const { getSignedImageUrl } = require('./imageController')

const menue = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const menue = restaurant.foodItems.map((foods)=>{
        return {
            name: foods.name,
            imageUrl: getSignedImageUrl(req.params.id,foods.foodId),
            price: foods.price,
            description: foods.description,
            rating: foods.rating,
            ratingCount: foods.ratingCount
            }
    })
    res.json(menue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
};

module.exports = {
  menue,
};

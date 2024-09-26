const UserModel = require("../models/UserSchema");
const FoodSchema = require("../models/FoodSchema");
const { getSignedImageUrl } = require('./imageController');

// Get Cart Function
const getCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cart = user.cart || [];

    // Asynchronous map to resolve all food items
    const foodPromises = cart.map(async (foodId) => {
      const foodItem = await FoodSchema.findById(foodId);
      if (foodItem) {
        return {
          foodId: foodItem._id,
          name: foodItem.name,
          price: foodItem.price,
          description: foodItem.description,
          rating: foodItem.rating,
          ratingCount: foodItem.ratingCount,
          image: getSignedImageUrl(foodItem._id),  // Get image URL for the food item
        };
      }
    });

    // Wait for all food items to resolve
    const result = await Promise.all(foodPromises);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// Add Item to Cart Function
const addIntoCart = async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const foodItem = await FoodSchema.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Ensure cart array exists
    user.cart = user.cart || [];
    user.cart.push(`${foodItem._id}`);

    await user.save();

    console.log("Added new item to cart:", {
      foodId: foodItem._id,
      quantity: 1,
      price: foodItem.price,
    });

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getCart,
  addIntoCart,
};

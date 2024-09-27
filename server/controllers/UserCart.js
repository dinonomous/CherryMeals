const mongoose = require("mongoose");
const UserModel = require("../models/UserSchema");
const FoodSchema = require("../models/FoodSchema");
const { getSignedImageUrl } = require("./imageController");

// Get Cart Function
const getCart = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cart = user.cart || [];

    const foodPromises = cart.map(async ({ foodId, quantity }) => {
      const foodItem = await FoodSchema.findById(foodId);
      if (foodItem) {
        return {
          foodId: foodItem._id,
          name: foodItem.name,
          price: foodItem.price,
          description: foodItem.description,
          rating: foodItem.rating,
          ratingCount: foodItem.ratingCount,
          image: getSignedImageUrl(foodItem._id),
          quantity, // Include quantity
        };
      }
    });

    const result = await Promise.all(foodPromises);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

const addIntoCart = async (req, res) => {
    const userId = req.params.id;
    const foodId = req.params.foodId;
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
  
      const foodItem = await FoodSchema.findById(foodId);
      if (!foodItem) {
        return res
          .status(404)
          .json({ success: false, message: "Food item not found" });
      }
  
      // Check if the food item already exists in the cart by comparing foodId (not _id)
      const cartItem = user.cart.find((item) => item.foodId.toString() === foodId);
  
      if (cartItem) {
        // Increment quantity if the item exists
        cartItem.quantity += 1;
      } else {
        // Add new item with quantity of 1 if it doesn't exist
        user.cart.push({ foodId: foodItem._id, quantity: 1 });
      }
  
      await user.save();
  
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
  

const updateCart = async (req, res) => {
  const userId = req.params.id;
  const { cart } = req.body; // Expect cart to be an array of { foodId, quantity }

  try {
    // Use findOneAndUpdate to atomically update the cart
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: { cart } }, // Expect cart to be passed as an array of { foodId, quantity }
      { new: true, runValidators: true } // Return the updated document and run validation
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart: updatedUser.cart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const deleteFromCart = async (req, res) => {
  const userId = req.params.id;
  const foodId = req.params.foodId;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Filter out the food item from the cart
    user.cart = user.cart.filter((item) => item.foodId.toString() !== foodId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Food item ${foodId} removed from cart`,
      cart: user.cart,
    });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getCart,
  addIntoCart,
  updateCart,
  deleteFromCart,
};

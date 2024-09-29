// routes/imageRoutes.js
const express = require("express");
const router = express.Router();
const { generateSignedUrl } = require("../controllers/imageController");
const { getRestaurantsWithOutFoodItemsId } = require("../controllers/HomePage");
const { menue } = require("../controllers/RestaurantMenue");
const Food = require("../models/FoodSchema");
const Restaurant = require("../models/RestaurantSchema");
const multer = require("multer");
const AWS = require("aws-sdk");
const s3 = require("../aws/s3Client"); // Ensure this points to your S3 configuration

// Configure multer for file storage
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

router.get("/nofooditems/:id", getRestaurantsWithOutFoodItemsId);

router.get("/nofooditems/:id/menue", menue);

router.get("/image/:restaurantId/:foodId", generateSignedUrl);

router.post('/addfood/:restaurantId', upload.single('image'), async (req, res) => {
    const { restaurantId } = req.params;
    const { name, price, description, rating } = req.body;
    const image = req.file;
  
    try {
      const restaurantExists = await Restaurant.findById(restaurantId);
      if (!restaurantExists) {
        return res.status(404).json({ success: false, message: "Restaurant not found" });
      }
  
      const newFood = new Food({
        foodId: `food-${Date.now()}`,
        name,
        price,
        description,
        rating: rating || 0,
        restaurantId,
      });
      const savedFood = await newFood.save();
      
      // Upload the image to S3 if it exists
      let imageUrl = '';
      if (image) {
        const params = {
          Bucket: 'dineshwar', // Your S3 bucket name
          Key: `CherryMeals/food/${savedFood._id}.png`, // Use savedFood._id as the filename
          Body: image.buffer, // The image buffer
          ContentType: image.mimetype, // Set the correct content type
        };
        const s3Response = await s3.upload(params).promise(); 
        imageUrl = s3Response.Location;
      }
  
      savedFood.imageUrl = imageUrl;
      await savedFood.save();
  
      restaurantExists.foodItems.push({ foodId: savedFood._id });
      await restaurantExists.save();
  
      return res.status(201).json({
        success: true,
        message: "Food item added successfully",
        food: savedFood,
        foodId: savedFood._id,
      });
    } catch (error) {
      console.error("Error adding food item:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });

router.delete("/deletefood/:foodId", async (req, res) => {
  const { foodId } = req.params;
    console.log(foodId);
  try {
    // Find and delete the food item
    const food = await Food.deleteOne({ _id: foodObjectId });
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    // Find the restaurant associated with the food item
    const restaurant = await Restaurant.findOneAndUpdate(
      { foodItems: foodId }, // Match the restaurant containing the food item
      { $pull: { foodItems: foodId } }, // Remove the foodId from the foodItems array
      { new: true } // Return the updated restaurant document
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({
          success: false,
          message:
            "Restaurant not found or food item was not in the restaurant's list",
        });
    }

    return res.status(200).json({
      success: true,
      message: "Food item deleted successfully",
      food,
      restaurant, // Optionally return the updated restaurant
    });
  } catch (error) {
    console.error("Error deleting food item:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

module.exports = router;

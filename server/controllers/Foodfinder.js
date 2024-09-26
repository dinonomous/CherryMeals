const FoodModel = require('../models/FoodSchema'); // Import the Food model

const searchFoodItems = async (req, res) => {
  const { query } = req.params; // Get the search query from the request

  try {
    const foodItems = await FoodModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, 
        { description: { $regex: query, $options: 'i' } }, 
      ],
    });

    return res.status(200).json({ success: true, foodItems });
  } catch (error) {
    console.error("Error searching food items:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports={
    searchFoodItems
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming Restaurant model is defined in a separate file
const FoodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant', // Reference to the Restaurant model
    required: true, // You can make this required if every food item must belong to a restaurant
  },
});

module.exports = mongoose.model('Food', FoodSchema);

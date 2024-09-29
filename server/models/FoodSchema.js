const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  foodId: { type: String, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  imageUrl: { type: String }, // Add the imageUrl field
});

module.exports = mongoose.model('Food', FoodSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Food', FoodSchema);

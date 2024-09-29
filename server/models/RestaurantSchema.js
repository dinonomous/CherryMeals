const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validates email format
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    minlength: 10, // Ensures a meaningful description
  },
  website: {
    type: String,
    match: /https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/, // Validates website format
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  foodItems: [
    {
      foodId: { type: String, ref: "Food", required: true },
    },
  ],
  ordersQueue: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  foodItems: [
    {
      foodId: { type: Schema.Types.ObjectId, ref: 'Food' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String },
      rating: { type: Number, default: 0 },
      ratingCount: { type: Number, default: 0 },
      image: { type: String }, // Field to store the image URL
    },
  ],
  rating: { type: Number, default: 0 },
  ordersQueue: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);

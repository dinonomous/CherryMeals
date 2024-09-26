const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  foodItems: [
    {
      foodId: { type: String, ref: 'Food', required: true }, // Reference to Food schema
    },
  ],
  rating: { type: Number, default: 0 },
  ordersQueue: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);


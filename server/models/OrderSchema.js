const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  restaurantId: { type: Schema.Types.ObjectId, required: true, ref: 'Restaurant' },
  items: [
    {
      foodId: { type: Schema.Types.ObjectId, required: true, ref: 'Food' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentLink: { type: String }, // New field for payment validation link
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', OrderSchema);

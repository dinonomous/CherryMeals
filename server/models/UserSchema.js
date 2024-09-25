const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
  },
  cart: {
    items: [
      {
        foodId: { type: Schema.Types.ObjectId, ref: 'Food' },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

module.exports = mongoose.model('User', UserSchema);

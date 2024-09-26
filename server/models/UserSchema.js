const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: false },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }], 
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;


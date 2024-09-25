const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Topfood = new Schema({
  foodId: { type: Schema.Types.ObjectId, ref: "Food" },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Topfood", Topfood);

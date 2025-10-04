import mongoose from "mongoose";
// const reviewSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   username: String,
//   rating: { type: Number, required: true },
//   comment: String,
//   createdAt: { type: Date, default: Date.now },
// });

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  // reviews: [reviewSchema],
  // averageRating: { type: Number, default: 0 },
});
// using this schema we create a model
//but when we run this file again it will create a new model again
//so we use this line to check if the model already exists or not
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);
export default foodModel;
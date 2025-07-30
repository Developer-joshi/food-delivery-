import foodModel from "../models/foodModel.js";
import fs from "fs";
//fs file system of node js

// add food function


const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } 
  catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//list all food function
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } 
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
// Add a review to a food item
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const foodId = req.params.foodId;
    const userId = req.user._id;
    const username = req.user.name;

    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: "Food not found" });

    food.reviews.push({ userId, username, rating, comment });

    // Recalculate average rating
    const totalRating = food.reviews.reduce((acc, r) => acc + r.rating, 0);
    food.averageRating = totalRating / food.reviews.length;

    await food.save();

    const newReview = food.reviews[food.reviews.length - 1]; // the one just pushed

    res.json({
      success: true,
      message: "Review added",
      averageRating: food.averageRating,
      review: newReview,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
const getReviews = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.foodId);

    if (!food)
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });

    res.json({
      success: true,
      reviews: food.reviews,
      averageRating: food.averageRating,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export { addFood, listFood, removeFood, addReview, getReviews };

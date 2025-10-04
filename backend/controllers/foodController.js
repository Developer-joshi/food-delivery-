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

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    const foodsWithRatings = foods.map((food) => {
      const reviews = food.reviews || [];
      const averageRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      return {
        ...food._doc,
        averageRating: Number(averageRating.toFixed(1)), // limit to 1 decimal
        reviewCount: reviews.length,
      };
    });

    res.json({ success: true, data: foodsWithRatings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


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

export { addFood, listFood, removeFood};

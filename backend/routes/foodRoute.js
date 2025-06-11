// importing controllers for adding food
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import express from "express";
import multer from "multer";
const foodRouter = express.Router();

//image upload engine using multer diskstorage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});


const upload = multer({ storage: storage });
//upload middleware
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;

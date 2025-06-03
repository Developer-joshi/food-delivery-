// importing controllers for adding food
import { addFood } from "../controllers/foodController.js";
import express from "express";
import multer from "multer";
const foodRouter = express.Router();

//image upload engine using multer diskstorage
const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });
//adding middlewares
foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;

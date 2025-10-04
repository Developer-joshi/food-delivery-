import userModel from "../models/userModel.js";

// add items to user cart
const addToCart = async (req, res) => {
  try {
    // add items to user cart
    let userData = await userModel.findById(req.user.id); // ✅ change from req.body.userId
    let cartData = userData.cartData || {}; // ✅ default empty object

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // remove items from user cart
    let userData = await userModel.findById(req.user.id); // ✅ change from req.body.userId
    let cartData = userData.cartData || {}; // ✅ default empty object

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// get user cart data
const getCart = async (req, res) => {
  try {
    // get user cart data
    let userData = await userModel.findById(req.user.id); // ✅ change from req.body.userId
    let cartData = userData.cartData || {}; // ✅ default empty object

    res.json({ success: true, cartData: cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };

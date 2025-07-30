import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link } from "react-router-dom";
const FoodItem = ({id,name,price,description,image}) => {

    // const [itemCount,setItemCount] = useState(0);
    //for each of the 32 product state not good practice
    //so use context api
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
    
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <p style={{ fontWeight: "bold" }}>
              {averageRating?.toFixed(1) || "0.0"}
            </p>
            <img
              src={assets.star_filled_icon}
              alt="star"
              style={{ width: "16px" }}
            />
            <p style={{ color: "gray", fontSize: "14px" }}>
              {reviews?.length || 0} Reviews
            </p>
          </div>
        </div>
        {/* Add/View Review Button */}
        <Link to={`/reviews/${id}`}>
          <button className="review-btn">Add/View Reviews</button>
        </Link>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
}

export default FoodItem

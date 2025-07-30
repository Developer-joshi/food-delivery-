import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ReviewPage.css";
import { StoreContext } from "../../context/StoreContext";

const ReviewPage = () => {
  const { foodId } = useParams();
  const { token, url } = useContext(StoreContext);
  const [food, setFood] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const [message, setMessage] = useState("");

  const getFoodReviews = async () => {
    try {
      const res = await axios.get(`${url}/api/reviews/${foodId}`);
      if (res.data.success) setFood(res.data.food);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await axios.post(
        `${url}/api/reviews/${foodId}`,
        { rating: userRating, comment: userComment },
        { headers: { token } }
      );
      setMessage(res.data.message);
      setUserRating(0);
      setUserComment("");
      getFoodReviews();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error");
    }
  };

  useEffect(() => {
    getFoodReviews();
  }, []);

  if (!food) return <p>Loading...</p>;

  return (
    <div className="review-page">
      <h2>{food.name}</h2>
      <p>{food.description}</p>
      <h3>Average Rating: {food.averageRating?.toFixed(1)} ⭐</h3>
      <h4>{food.reviews.length} Review(s)</h4>

      <div className="add-review">
        <label>Rating: </label>
        <select
          value={userRating}
          onChange={(e) => setUserRating(+e.target.value)}
        >
          <option value={0}>Select</option>
          {[1, 2, 3, 4, 5].map((s) => (
            <option key={s} value={s}>
              {s} Star
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your review..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        />
        <button onClick={handleReviewSubmit}>Submit</button>
        {message && <p>{message}</p>}
      </div>

      <div className="all-reviews">
        {food.reviews.map((r, idx) => (
          <div key={idx} className="single-review">
            <strong>{r.username}</strong> ({r.rating}⭐)
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;

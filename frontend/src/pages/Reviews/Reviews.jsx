import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext"; // adjust if path differs

const ReviewPage = () => {
  const { foodId } = useParams();
  const { url, token } = useContext(StoreContext);

  const [reviews, setReviews] = useState([]);
  const [foodDetails, setFoodDetails] = useState({});
  const [averageRating, setAverageRating] = useState(0);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${url}/api/food/reviews/${foodId}`);
        setReviews(res.data.reviews);
        setAverageRating(res.data.averageRating);
        setFoodDetails(res.data.food); // if sent from backend
      } catch (err) {
        console.error("Error fetching reviews", err);
      }
    };
    fetchReviews();
  }, [foodId]);
const handleSubmitReview = async () => {
  if (!rating || !comment) {
    setSubmitMessage("Please provide both rating and comment.");
    return;
  }

  try {
    const res = await axios.post(
      `${url}/api/food/review/${foodId}`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data.success) {
      setSubmitMessage("Review submitted successfully!");
      setReviews([...reviews, res.data.review]);
      setRating("");
      setComment("");
    } else {
      setSubmitMessage(res.data.message || "Something went wrong.");
    }
  } catch (err) {
    setSubmitMessage(err.response?.data?.message || "Error submitting review.");
  }
};

  return (
    <div className="review-page">
      <h2>{foodDetails.name}</h2>
      <p>{foodDetails.description}</p>

      <h3>Average Rating: {averageRating?.toFixed(1)} ⭐</h3>
      <p>{reviews.length} Reviews</p>

      <div className="review-list">
        {reviews.map((r) => (
          <div key={r._id} className="single-review">
            <p>
              ⭐ {r.rating} — {r.comment}
            </p>
            <p style={{ fontSize: "12px", color: "gray" }}>
              {r.isVerified && "✔ Verified Purchase"}
            </p>
          </div>
        ))}
      </div>

      {token && (
        <div className="add-review">
          <h3>Add Your Review</h3>
          {/* we’ll add form inputs next */}
          <div className="review-form">
            <label>Rating (1–5):</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>

            <label>Comment:</label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
            />

            <button onClick={handleSubmitReview}>Submit Review</button>
            {submitMessage && <p style={{ color: "green" }}>{submitMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import "./AdminFeedback.css";

const AdminFeedback = ({ user }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get(`${server}/api/feedbacks`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFeedbacks(data.feedbacks);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
      alert(error.response?.data?.message || "Failed to fetch feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="admin-feedback-page">
      <h2>All Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <div className="feedback-list">
          {feedbacks.map((feedback) => (
            <div key={feedback._id} className="feedback-item">
              <p><strong>Email:</strong> {feedback.email || "Not provided"}</p>
              <p><strong>Course:</strong> {feedback.course || "Unknown Course"}</p>
              <p><strong>Rating:</strong> {feedback.rating}</p>
              <p><strong>Comment:</strong> {feedback.comment}</p>
              <p><strong>Submitted At:</strong> {new Date(feedback.createdAt).toLocaleString()}</p>
            </div>
          ))}

        </div>
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
};

export default AdminFeedback;
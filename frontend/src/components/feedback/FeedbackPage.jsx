import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './feedback.css';  
import { toast } from 'react-hot-toast';  
import { server } from "../../main";

const FeedbackForm = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState('');
  
  const handleEmojiClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim() || !course) {
      alert("Please select a rating, a course, and write a comment.");
      return;
    }

    try {
      const response = await axios.post(`${server}/api/feedback`, {
        rating,
        comment,
        email,
        course,
      });

      toast.success("Feedback submitted successfully!");
      setRating('');
      setComment('');
      setEmail('');
      setCourse('');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const { data } = await axios.get(`${server}/api/course/all`);
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    getAllCourses();
  }, []);

  return (
    <div className="feedback-container">
      <h1>Submit Feedback</h1>
      <p>How was your experience?</p>

      <form onSubmit={handleSubmit}>
        <div className="emoji-options">
          {['😞', '😐', '😊'].map((emoji, idx) => (
            <button
              key={idx}
              type="button"
              className={`emoji-btn ${rating === `${idx + 1}` ? 'selected' : ''}`}
              onClick={() => handleEmojiClick(`${idx + 1}`)}
            >
              {emoji}
            </button>
          ))}
        </div>

        <input
          type="email"
          className='feed_mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <select value={course} onChange={(e) => setCourse(e.target.value)} required>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comments..."
          required
        />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;

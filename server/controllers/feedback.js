// controllers/feedbackController.js
import Feedback from "../models/feedbackModel.js";

export const submitFeedback = async (req, res) => {
  try {
    const { rating, comment, email, course } = req.body;

    // Validate input
    if (!rating || !comment || !course) {
      return res.status(400).json({
        message: "Rating, comment, and course are required.",
      });
    }

    // Build feedback object
    const feedbackData = {
      rating,
      comment,
      email,
      course,
    };

    // Attach user if authenticated
    if (req.user && req.user._id) {
      feedbackData.user = req.user._id;
    }

    // Save to database
    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({
      message: "Thank you for your feedback!",
      feedback,
    });
  } catch (error) {
    console.error("Error while submitting feedback:", error.message);
    res.status(500).json({
      message: "Error while submitting feedback.",
    });
  }
};

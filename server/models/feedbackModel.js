import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  course: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Feedback", feedbackSchema);

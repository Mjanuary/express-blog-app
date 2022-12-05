import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdAt: Date,
});

export default CommentSchema;

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
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

export { CommentSchema };

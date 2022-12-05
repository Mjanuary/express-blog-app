import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cover: {
    type: String,
  },
  createdAt: Date,
});

export default BlogSchema;

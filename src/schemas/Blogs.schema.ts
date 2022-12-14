import mongoose from "mongoose";
import { BlogStatus, SchemasTypes } from "../enums";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  cover_url: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SchemasTypes.User,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(BlogStatus),
    default: BlogStatus.ACTIVE,
  },
  reactions: {
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemasTypes.User,
        required: true,
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SchemasTypes.User,
        required: true,
      },
    ],
  },
  createdAt: Date,
});

BlogSchema.index({ title: 1 });
BlogSchema.index({ tags: 1 });

export { BlogSchema };

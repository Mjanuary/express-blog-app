import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  names: {
    type: String,
  },
  createdAt: Date,
});

UsersSchema.index({ email: 1 });

export default UsersSchema;
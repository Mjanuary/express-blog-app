import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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

UserSchema.index({ email: 1 });

export { UserSchema };

import { Document, Schema } from "mongoose";
import { BlogStatus } from "../enums";

export interface CommentInterface extends Document {
  _id: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  blogId: Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
}

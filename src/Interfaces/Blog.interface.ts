import { Document, Schema } from "mongoose";
import { BlogStatus } from "../enums";

export interface BlogInterface extends Document {
  _id?: Schema.Types.ObjectId;
  title: string;
  tags: string[];
  description: string;
  cover: string;
  createdBy: Schema.Types.ObjectId;
  status: BlogStatus;
  reactions: {
    likes: Schema.Types.ObjectId[];
    dislikes: Schema.Types.ObjectId[];
  };
  createdAt: Date;
  __v?: 0;
}

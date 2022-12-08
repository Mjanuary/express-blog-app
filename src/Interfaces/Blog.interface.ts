import { Schema } from "mongoose";
import { BlogStatus } from "../enums";

export interface BlogInterface {
  _id?: Schema.Types.ObjectId | any;
  title: string;
  tags: string[];
  description: string;
  cover_url: string;
  createdBy: Schema.Types.ObjectId | any;
  status: BlogStatus;
  reactions: {
    likes: Schema.Types.ObjectId[];
    dislikes: Schema.Types.ObjectId[];
  };
  createdAt: Date;
  __v?: 0;
  totalLikes?: number;
  totalDislikes?: number;
}

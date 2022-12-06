import { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  names: string;
  createdAt: Date;
}

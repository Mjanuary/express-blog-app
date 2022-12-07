import { Document, Schema } from "mongoose";

export interface UserInterface {
  _id?: Schema.Types.ObjectId | any;
  username: string;
  email: string;
  names: string;
  createdAt?: any;
  __v?: 0;
}

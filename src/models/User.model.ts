import mongoose from "mongoose";
import { SchemasTypes, CollectionEnum } from "../enums";
import { UserSchema } from "../schemas";

export const UserModel = mongoose.model(
  SchemasTypes.User,
  UserSchema,
  CollectionEnum.users
);

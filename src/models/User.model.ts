import mongoose from "mongoose";
import SchemasTypes from "../enums/schema.enum";
import CollectionEnum from "../enums/Collection.enum";
import UserSchema from "../schemas/User.schema";

export default mongoose.model(
  SchemasTypes.User,
  UserSchema,
  CollectionEnum.users
);

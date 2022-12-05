import mongoose from "mongoose";
import SchemasTypes from "../enums/schema.enum";
import CollectionEnum from "../enums/Collection.enum";

import CommentSchema from "../schemas/Comment.schema";

export default mongoose.model(
  SchemasTypes.Comments,
  CommentSchema,
  CollectionEnum.comments
);

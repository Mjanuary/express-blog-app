import mongoose from "mongoose";
import { SchemasTypes, CollectionEnum } from "../enums";
import { CommentSchema } from "../schemas";

export const CommentModel = mongoose.model(
  SchemasTypes.Comments,
  CommentSchema,
  CollectionEnum.comments
);

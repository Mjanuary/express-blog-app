import mongoose from "mongoose";
import { SchemasTypes, CollectionEnum } from "../enums";

import { BlogSchema } from "../schemas";

export const BlogModel = mongoose.model(
  SchemasTypes.Blog,
  BlogSchema,
  CollectionEnum.blogs
);

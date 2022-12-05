import mongoose from "mongoose";
import SchemasTypes from "../enums/schema.enum";
import CollectionEnum from "../enums/Collection.enum";

import BlogSchema from "../schemas/Blogs.schema";

export default mongoose.model(
  SchemasTypes.Blog,
  BlogSchema,
  CollectionEnum.blogs
);

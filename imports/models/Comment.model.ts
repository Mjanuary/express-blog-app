import mongoose from "mongoose";

import CommentSchema from "../schemas/Comment.schema";

export default mongoose.model("Comment", CommentSchema, "comments");

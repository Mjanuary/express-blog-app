import mongoose from "mongoose";

import BlogSchema from "../schemas/Blogs.schema";

export default mongoose.model("Blog", BlogSchema, "blog");

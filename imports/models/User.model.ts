import mongoose from "mongoose";

import UserSchema from "../schemas/User.schema";

export default mongoose.model("User", UserSchema, "users");

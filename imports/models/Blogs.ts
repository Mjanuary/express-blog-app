import mongoose from 'mongoose';

import BlogSchema from "../schemas/Blogs"

export default mongoose.model('Blog', BlogSchema, 'blog');

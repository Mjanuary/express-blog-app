import mongoose from 'mongoose';
// import userStatusEnums from '../api/enums/userStatusEnums';

const genderEnum = [ 'male', 'female', 'unknown' ];
// const userStatus = Object.values(userStatusEnums);

const BlogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    cover: {
      type: String,
    },
    middleName: String,
    gender: {
      type: String,
      enum: genderEnum,
    },

  createdAt: Date,
});

export default BlogSchema;
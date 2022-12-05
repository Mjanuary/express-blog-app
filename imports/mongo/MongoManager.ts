import mongoose from "mongoose";

// const MONGO_URL = process.env.MONGO_URL
const MONGO_URL = "mongodb://localhost:27017/blog_app";

class MongoManager {
  mongoUrl: string = "";
  constructor() {
    console.log(MONGO_URL);

    if (!MONGO_URL) throw new Error("No connection found");
    this.mongoUrl = MONGO_URL;
  }

  getMongoUrl() {
    return this.mongoUrl;
  }

  connect() {
    return mongoose.connect(this.getMongoUrl());
  }

  disconnect(): void {
    return this.disconnect();
  }
}

export const mongoManager = new MongoManager();

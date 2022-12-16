import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

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

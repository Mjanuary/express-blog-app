import { Logger } from "./logger";

const { MONGO_URL } = process.env;

export const connectionPromise = async (mongoUri: any) => {
  Logger.info(
    `Create database connection to local server: ${mongoUri || MONGO_URL}`
  );
};

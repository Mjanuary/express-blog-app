import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { mongoManager } from "./src/mongo";
import { router } from "./src/routers/router";
import corsOptions from "./src/utils/cors.config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(helmet());
mongoManager.connect();

app.use(cors(corsOptions));

// logger with Morgan
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(bodyParser.json({ limit: "25mb" }));

app.get("/", (req: Request, res: Response) =>
  res.send("Express + TypeScript Server")
);

app.use(router);

app.listen(port, () => {
  console.log({ port });

  console.log(`🚀: Server is running at https://localhost:${port}`);
});

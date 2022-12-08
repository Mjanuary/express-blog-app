import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import corsOptions from "./src/utils/cors.config";
import { router } from "./src/routers/router";
import { mongoManager } from "./src/mongo";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(helmet());
mongoManager.connect();

app.use(cors(corsOptions));

app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(bodyParser.json({ limit: "25mb" }));

app.get("/", (req: Request, res: Response) =>
  res.send("Express + TypeScript + Testing")
);

app.use(router);

app.listen(port, () => {
  console.log(`🚀: Server is running at https://localhost:${port}`);
});

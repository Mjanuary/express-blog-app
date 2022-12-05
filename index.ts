import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

import { mongoManager } from "./imports/mongo";
import { router } from "./routers/router";
import corsOptions from "./cors.config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(helmet());
mongoManager.connect();


app.use(cors(corsOptions));

// HTTP request logger with Morgan
app.use(
  morgan("combined", {
    skip: (req, res) => res.statusCode < 400,
  })
);

// Parse the body request to json
app.use(bodyParser.json({ limit: "25mb" }));

app.get("/", (req: Request, res: Response) =>
  res.send("Express + TypeScript Server")
);

app.use(router);

// const errorHandler = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   return res.status(400).send({ message: err.message });
// };

// app.use(errorHandler);

app.listen(port, () => {
  console.log({port});
  
  console.log(`🚀: Server is running at https://localhost:${port}`);
});

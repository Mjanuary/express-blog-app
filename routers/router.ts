import express from "express";
import publicRouter from "./publicRouter";

export const router = express.Router();

router.use("/blogs", publicRouter);

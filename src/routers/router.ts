import express from "express";
import publicRouter from "./public.router";

export const router = express.Router();

router.use("/blogs", publicRouter);

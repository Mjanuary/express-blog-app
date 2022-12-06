import express from "express";
import BlogRouter from "./blog.router";
import UserRouter from "./user.router";

export const router = express.Router();

router.use("/users", UserRouter);
router.use("/blogs", BlogRouter);

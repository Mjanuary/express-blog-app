import express from "express";
import { check } from "express-validator";
import { AllBlogs, createBlogs } from "../controller/Blog.controller";

const router = express.Router();

router.get("/", AllBlogs);

router.post(
  "/",
  [
    check("username").isString().withMessage("Username is required"),
    check("email").isString(),
    check("names").isString(),
  ],
  createBlogs
);

export default router;

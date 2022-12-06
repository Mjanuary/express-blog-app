import express from "express";
import { check } from "express-validator";
import { AllBlogs, createBlogs } from "../controller/Blog.controller";

const router = express.Router();

router.get("/", AllBlogs);
router.post(
  "/",
  [
    check("title").isString(),
    check("description").isString(),
    check("cover").isString(),
    check("createdBy").isString(),
  ],
  createBlogs
);

export default router;

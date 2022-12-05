import express from "express";
import { check } from "express-validator";
import { AllBlogs, createBlogs } from "../controller/BlogsContoller";

const router = express.Router();

router.get("/", AllBlogs);
router.post(
  "/",
  [
    check("title").isString(),
    check("description").isString(),
    check("cover").isString(),
  ],
  createBlogs
);

export default router;

import express from "express";
import { check } from "express-validator";
import { AllBlogs, createBlogs } from "../controller/Blog.controller";
import { SortByEnum } from "../enums";

const router = express.Router();

router.get(
  "/",
  [
    check("page")
      .optional()
      .isInt({ min: 1 })
      .toInt()
      .default(1)
      .withMessage("value must be an integer greater than 0"),
    check("limit")
      .optional()
      .isInt({ min: 1, max: 100 })
      .toInt()
      .default(10)
      .withMessage("value must be an integer between 1 and 100"),
    check("withAuthor").optional().isBoolean().toBoolean(),
    check("userId").optional().isMongoId(),
    check("sortBy").optional().isIn(Object.values(SortByEnum)),
  ],
  AllBlogs
);

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

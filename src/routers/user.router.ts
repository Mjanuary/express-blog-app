import express from "express";
import { check } from "express-validator";
import { createUser, AllUsers, updateUser } from "../controller";

const router = express.Router();

router.get("/", AllUsers);

router.post(
  "/",
  [
    check("username").isString().notEmpty().withMessage("Username is required"),
    check("email").isString().notEmpty().withMessage("Email is required"),
    check("names").isString().notEmpty().withMessage("Names is required"),
  ],
  createUser
);

router.put(
  "/",
  [
    check("userId").isString().notEmpty().withMessage("UserId is is required"),
    check("username").isString().notEmpty().withMessage("Username is required"),
    check("email").isString().notEmpty().withMessage("Email is required"),
    check("names").isString().notEmpty().withMessage("Names is required"),
  ],
  updateUser
);
export default router;

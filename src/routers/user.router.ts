import express from "express";
import { check } from "express-validator";
import { createUser, AllUsers, updateUser, deleteUser } from "../controller";

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

router.delete(
  "/:userId",
  [check("userId").notEmpty().withMessage("UserId is is required")],
  deleteUser
);
export default router;

import express from "express";

const router = express.Router();

// const { check } = require("express-validator");

import { AllBlogs } from "../controller/BlogsContoller";

router.get("/", AllBlogs);

export default router;

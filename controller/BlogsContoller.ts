import { Request, Response } from "express";
import Blogs from "../imports/models/Blogs";

export const AllBlogs = async (req: Request, res: Response) => {
  try {
    let data = await Blogs.find();

    return res.send(data);
  } catch (error) {}
};

export const createBlogs = async (req: Request, res: Response) => {
  try {
    const { cover, description, title } = req.body;

    let data = await Blogs.create({
      cover,
      createdAt: new Date(),
      description,
      title,
    });

    return res.send(data);
  } catch (error) {}
};

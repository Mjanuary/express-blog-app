import { Request, Response } from "express";
import { BlogModel } from "../models";

export const AllComments = async (req: Request, res: Response) => {
  try {
    let data = await BlogModel.find();

    return res.send(data);
  } catch (error) {}
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { cover, description, title } = req.body;

    let data = await BlogModel.create({
      cover,
      createdAt: new Date(),
      description,
      title,
    });

    return res.send(data);
  } catch (error) {}
};

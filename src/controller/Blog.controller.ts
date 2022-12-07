import { Request, Response } from "express";
import { SortByEnum } from "../enums";
import { BlogModel } from "../models";
import { BlogService } from "../service";

export const AllBlogs = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 25,
      sortBy = SortByEnum.ACCEDING,
      withCreators = false,
      createdBy,
    } = req.query;

    const envelopeActivities = await BlogService.getBlogs({
      page: +page,
      limit: +limit,
      sortBy: SortByEnum.ACCEDING,
      withCreators: !!withCreators,
      createdBy: typeof createdBy === "string" ? createdBy : undefined,
    });

    return res.send(envelopeActivities);
  } catch (error) {}
};

export const createBlogs = async (req: Request, res: Response) => {
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

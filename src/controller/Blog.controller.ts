import { throws } from "assert";
import { Request, Response } from "express";
import { SortByEnum } from "../enums";
import { BlogModel } from "../models";
import { BlogService } from "../service";

export const AllBlogs = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 25,
      // sortBy = SortByEnum.ACCEDING, // Sort is not yet implemented
      withAuthor = false,
      createdBy,
    } = req.query;

    const envelopeActivities = await BlogService.getBlogs({
      page: +page,
      limit: +limit,
      sortBy: SortByEnum.ACCEDING,
      withAuthor: !!withAuthor,
      createdBy: typeof createdBy === "string" ? createdBy : undefined,
    });

    return res.send(envelopeActivities);
  } catch (error) {
    throw new Error("");
  }
};

export const createBlogs = async (req: Request, res: Response) => {
  try {
    const { cover_url, description, title } = req.body;

    let data = await BlogModel.create({
      cover_url,
      createdAt: new Date(),
      description,
      title,
    });

    return res.send(data);
  } catch (error) {
    throw new Error("");
  }
};

import { Request, Response } from "express";
import { Types } from "mongoose";
import { BlogStatus, SortByEnum } from "../enums";
import { BlogModel } from "../models";
import { BlogService } from "../service";
import { errorHandler } from "../utils/error";

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
    errorHandler(res, error);
  }
};

export const createBlogs = async (req: Request, res: Response) => {
  try {
    const { cover_url, description, title, createdBy, tags } = req.body;

    let data = await BlogService.createBlog({
      cover_url: cover_url,
      createdAt: new Date(),
      description,
      title,
      createdBy: new Types.ObjectId(createdBy),
      tags: tags || [],
      status: BlogStatus.ACTIVE,
      reactions: {
        dislikes: [],
        likes: [],
      },
    });

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

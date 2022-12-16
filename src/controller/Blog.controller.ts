import { Request, Response } from "express";
import { Types } from "mongoose";
import { BlogLikeDislikeEnum, BlogStatus, SortByEnum } from "../enums";
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

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { cover_url, description, title, createdBy, tags, blogId } = req.body;

    let data = await BlogService.updateBlog({
      cover_url,
      description,
      title,
      createdBy: new Types.ObjectId(createdBy),
      tags,
      _id: new Types.ObjectId(blogId),
    });

    return res.send({
      msg:
        data.modifiedCount >= 1
          ? "Post has been updated successfully"
          : "No change made",
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    let data = await BlogService.deleteBlog(new Types.ObjectId(blogId));

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const blogDetails = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    let data = await BlogService.getBlogDetails(new Types.ObjectId(blogId));

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

export const likeDislikeBlog = async (req: Request, res: Response) => {
  try {
    // const { blogId, userId, status } = req.params;
    const { blogId, userId, action } = req.body;
    let data = await BlogService.likeDislikeBlog(
      new Types.ObjectId(blogId),
      new Types.ObjectId(userId),
      action as BlogLikeDislikeEnum
    );

    return res.send(data);
  } catch (error) {
    errorHandler(res, error);
  }
};

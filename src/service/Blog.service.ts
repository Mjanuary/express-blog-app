import { Schema, Types } from "mongoose";
import { SortByEnum } from "../enums";
import { BlogModel } from "./../models/Blog.model";
import { getPage } from "../utils/functions";

export class BlogService {
  static sortBlog(sortBy: SortByEnum) {
    let sort;
    switch (sortBy) {
      case SortByEnum.ACCEDING:
        sort = { createdAt: 1 };
        break;
      case SortByEnum.DESCENDING:
        sort = { createdAt: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    return sort;
  }

  static getBlogs = async (query: {
    page: number;
    limit: number;
    sortBy: SortByEnum;
    withAuthor?: boolean;
    createdBy?: string;
  }): Promise<{
    total: number;
    data: any[];
    page: number;
  }> => {
    try {
      const { limit, page, sortBy, withAuthor, createdBy } = query;
      const skip = getPage(page, limit);
      const sort = BlogService.sortBlog(sortBy);

      const pipelines: any[] = [];

      if (createdBy) {
        pipelines.push({
          $match: { createdBy: new Types.ObjectId(createdBy) },
        });
      }

      if (withAuthor) {
        pipelines.push(
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "author",
            },
          },
          {
            $unwind: {
              path: "$author",
              preserveNullAndEmptyArrays: true,
            },
          }
        );
      }

      pipelines.push(
        { $sort: sort },
        {
          $facet: {
            metadata: [{ $count: "total" }],
            data: [{ $skip: skip }, { $limit: limit }],
          },
        },
        {
          $project: {
            data: 1,
            total: { $arrayElemAt: ["$metadata.total", 0] },
          },
        }
      );

      const getBlogs = await BlogModel.aggregate(pipelines);

      const blogsList = getBlogs[0];

      return {
        total: blogsList?.total || 0,
        data: blogsList?.data,
        page,
      };
    } catch (e) {
      throw e;
    }
  };
}

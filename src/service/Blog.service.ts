import { UserModel } from "./../models/User.model";
import { Schema, Types } from "mongoose";
import { BlogLikeDislikeEnum, CollectionEnum, SortByEnum } from "../enums";
import { BlogModel } from "./../models/Blog.model";
import { getPage } from "../utils/functions";
import { BlogInterface } from "../interfaces";

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
              from: CollectionEnum.users,
              localField: "createdBy",
              foreignField: "_id",
              as: "author",
              pipeline: [
                {
                  $project: {
                    names: 1,
                  },
                },
              ],
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
          $unset: ["description"],
        },
        {
          $project: {
            title: 1,
            tags: 1,
            createdAt: 1,
            cover_url: 1,
            status: 1,
            author: 1,
            likes: 1,
            totalLikes: {
              $cond: {
                if: { $isArray: "$reactions.likes" },
                then: { $size: "$reactions.likes" },
                else: 0,
              },
            },
            totalDislikes: {
              $cond: {
                if: { $isArray: "$reactions.dislikes" },
                then: { $size: "$reactions.dislikes" },
                else: 0,
              },
            },
          },
        },
        {
          $unwind: {
            path: "$reactions.likes",
            preserveNullAndEmptyArrays: true,
          },
        },
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

  static createBlog = async (blog: BlogInterface) => {
    try {
      let checkUserExist = await UserModel.find({ _id: blog.createdBy });
      if (checkUserExist.length <= 0)
        throw new Error("Please provide a valid createdBy value");

      let checkBlogExistByTitle = await BlogModel.find({ title: blog.title });
      if (checkBlogExistByTitle.length >= 1)
        throw new Error(
          "This title has been used before, please pick another title"
        );

      return await BlogModel.create(blog);
    } catch (e) {
      throw e;
    }
  };

  static deleteBlog = async (blogId: any) => {
    try {
      return await BlogModel.deleteOne({ _id: blogId });
    } catch (e) {
      throw e;
    }
  };

  static updateBlog = async (blog: BlogInterface) => {
    try {
      let checkUserExist = await UserModel.find({ _id: blog.createdBy });

      if (checkUserExist.length <= 0)
        throw new Error("Please provide a valid createdBy value");

      let checkBlogExistByTitle = await BlogModel.find({
        title: blog.title,
        _id: { $ne: blog._id },
      });
      if (checkBlogExistByTitle.length >= 1)
        throw new Error(
          "This title has been used before, please pick another title"
        );

      const {
        cover_url,
        createdAt,
        createdBy,
        description,
        status,
        tags,
        title,
        _id,
      } = blog;

      return await BlogModel.updateOne(
        { _id },
        {
          $set: {
            cover_url,
            createdAt,
            createdBy,
            description,
            status,
            tags,
            title,
          },
        }
      );
    } catch (e) {
      throw e;
    }
  };

  static getBlogDetails = async (blogId: any) => {
    try {
      const pipelines: any[] = [
        {
          $match: { _id: blogId },
        },
        {
          $lookup: {
            from: CollectionEnum.users,
            localField: "createdBy",
            foreignField: "_id",
            as: "author",
            pipeline: [
              {
                $project: {
                  names: 1,
                },
              },
            ],
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            title: 1,
            tags: 1,
            createdAt: 1,
            cover_url: 1,
            status: 1,
            author: 1,
            likes: 1,
            totalLikes: {
              $cond: {
                if: { $isArray: "$reactions.likes" },
                then: { $size: "$reactions.likes" },
                else: 0,
              },
            },
            totalDislikes: {
              $cond: {
                if: { $isArray: "$reactions.dislikes" },
                then: { $size: "$reactions.dislikes" },
                else: 0,
              },
            },
          },
        },
        {
          $unwind: {
            path: "$reactions.likes",
            preserveNullAndEmptyArrays: true,
          },
        },
      ];

      const getBlogs = await BlogModel.aggregate(pipelines);

      if (getBlogs.length <= 0) throw new Error("No blog found!");

      return getBlogs[0];
    } catch (e) {
      throw e;
    }
  };

  static likeDislikeBlog = async (
    blogId: any,
    userId: any,
    status: BlogLikeDislikeEnum
  ) => {
    try {
      const pipelines: any[] = [
        {
          $match: { _id: blogId },
        },
        // {
        //   $pullAll: {
        //     "reaction.likes": "2324242",
        //   },
        // },
        {
          $set: {
            // reaction: {
            "reaction.dislikes": {
              $filter: {
                input: "$dislikes",
                as: "dislikes",
                cond: { $eq: ["$dislikes", "2324242"] }, // your condition expression
              },
            },
            // },
          },
        },
        // {
        //   $push: {
        //     "$reactions.likes": "janvier",
        //   },
        // },
      ];

      const getBlogs = await BlogModel.aggregate(pipelines);

      if (getBlogs.length <= 0) throw new Error("No blog found!");

      return getBlogs[0];
    } catch (e) {
      throw e;
    }
  };
}

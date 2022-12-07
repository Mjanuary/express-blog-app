import { Schema, Types } from "mongoose";
import { SortByEnum } from "../enums";
import { BlogModel } from "./../models/Blog.model";
import { getPage } from "../utils/functions";

export class BlogService {
  // constructor(parameters) {
  // }

  static getBlogs = async (query: {
    page: number;
    limit: number;
    sortBy: SortByEnum;
    withCreators?: boolean;
    createdBy?: string;
  }) => {
    try {
      //   const EnvelopeActivity = BlogModel();

      //   EnvelopeService.validateGetEnvelopeActivitiesFileds(query);

      const { limit, page, sortBy, withCreators, createdBy } = query;
      let skip = getPage(page, limit);
      // const sort = EnvelopeService.prepareEnvelopeActivitySortBy(sortBy);

      const conditions: { createdBy?: any } = {
        // envelopeId: Types.ObjectId(envelopeId),
      };

      // if (createdBy) {
      //  conditions.createdBy = Types.ObjectId(createdBy);
      // }

      const pipelines: any[] = [{ $match: conditions }];

      if (withCreators) {
        pipelines.push(
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "profile",
            },
          },
          {
            $unwind: {
              path: "$profile",
              preserveNullAndEmptyArrays: true,
            },
          }
        );
      }

      pipelines.push(
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
      };
    } catch (e) {
      throw e;
    }
  };
}

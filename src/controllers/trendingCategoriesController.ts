import { Request, Response } from "express";
import { CoderModel } from "../models/Coder";
import mongoose from "mongoose";

export const trendingCategoriesController = {
  getTrendingCategoriesbyUser: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role !== "coder") {
        res.status(403).json("User must be coder to see this content");
        return;
      }
      const coderId = new mongoose.Types.ObjectId(userId as string);

      const trendingCategories = await CoderModel.aggregate([
        { $match: { _id: coderId } },
        { $unwind: "$submission" },
        {
          $lookup: {
            from: "submission",
            localField: "submission",
            foreignField: "_id",
            as: "submissionList",
          },
        },
        { $unwind: "$submissionList" },
        { $match: { "submissionList.status": "passed" } },
        {
          $lookup: {
            from: "challenge",
            localField: "submissionList.challenge_id",
            foreignField: "_id",
            as: "challengeList",
          },
        },
        { $unwind: "$challengeList" },
        {
          $group: {
            _id: "$challengeList.category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0, //GTK: id to zero to b ignored, otw returns the cat define before
            category: "$_id",
            count: 1,
          },
        },
        { $sort: { count: -1 } },
      ]);

      res.status(200).json(trendingCategories);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
      return;
    }
  },
};

import { Request, Response } from "express";
import { heatmap } from "../data"; //fetch from db later
import mongoose from "mongoose";
import { CoderModel } from "../models/Coder";

export const heatmapController = {
  getHeatmap: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role !== "coder") {
        res.status(403).json("User must be coder to see this content");
        return;
      }
      const { start_date, end_date } = req.query;

      let setStartDate: Date;
      if (start_date) {
        setStartDate = new Date(start_date as string);
      } else {
        setStartDate = new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        );
      }
      let setEndDate: Date;
      if (end_date) {
        setEndDate = new Date(end_date as string);
      } else {
        setEndDate = new Date(new Date());
      }

      const coderId = new mongoose.Types.ObjectId(userId as string);

      const submitDates = await CoderModel.aggregate([
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
        {
          $match: {
            "submissionList.status": "passed",
            "submissionList.createdAt": {
              $gte: setStartDate,
              $lte: setEndDate,
            },
          },
        },
        {
          $addFields: {
            date: {
              $dateToString: {
                format: "%Y/%m/%d",
                date: "$submissionList.createdAt",
              },
            },
          },
        },
        {
          $group: {
            _id: "$date",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: "$_id",
            count: 1,
          },
        },
        { $sort: { date: 1 } },
      ]);

      res.status(200).json({ submitDates });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

import { Request, Response } from "express";
import { solvedChallenges, trendingCategories } from "../data"; //fetch from db later

export const trendingCategoriesController = {
  getTrendingCategories: async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "List of trending Categories",
        data: trendingCategories,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

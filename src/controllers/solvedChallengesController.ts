import { Request, Response } from "express";
import { solvedChallenges } from "../data"; //fetch from db later

export const solvedChallengesController = {
  getSolvedChallenges: async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "List of solved Challenges",
        data: solvedChallenges,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

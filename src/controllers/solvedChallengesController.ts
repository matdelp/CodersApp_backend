import { Request, Response } from "express";
import { solvedChallenges } from "../data"; //fetch from db later

export const solvedChallengesController = {
  getSolvedChallenges: async (req: Request, res: Response) => {
    try {
      res.json({
        message: "List of solved Challenges",
        data: solvedChallenges,
      });
    } catch (error) {}
  },
};

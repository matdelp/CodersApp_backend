import { Request, Response } from "express";
import { leaderboard } from "../data"; //fetch from db later
import { CoderModel } from "../models/Coder";
import { SubmissionModel } from "../models/Submission";

export const leaderboardController = {
  getLeaderboard: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role === "manager") {
        res.status(403).json("User must be coder to see the Leaderboard");
        return;
      }
      const coders = await CoderModel.find().sort({ score: -1 });

      const userChallenges = await SubmissionModel.find({
        coder_id: userId,
      });
      console.log(userChallenges);

      const solvedChallenges = userChallenges.filter(
        (challenge: any) => challenge.status === "passed"
      );
      res.status(200).json({ data: coders, solvedChallenges });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

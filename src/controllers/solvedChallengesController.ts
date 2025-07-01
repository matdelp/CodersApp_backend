import { Request, Response } from "express";
import { solvedChallenges } from "../data"; //fetch from db later
import { ChallengeModel } from "../models/Challenge";

export const solvedChallengesController = {
  getSolvedChallenges: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role === "manager") {
        res.status(403).json("User must be coder to see this content");
        return;
      }
      const easyChallenges = await ChallengeModel.find({ level: "Easy" });
      const moderateChallenges = await ChallengeModel.find({
        level: "Moderate",
      });
      const hardChallenges = await ChallengeModel.find({ level: "Hard" });

      res.status(200).json({
        data: {
          totalEasyChallenges: easyChallenges,
          totalModerateChallenges: moderateChallenges,
          totalHardChallenges: hardChallenges,
          // totalEasySolvedChallenges: easySolvedChallenges,
          // totalModerateSolvedChallenges: moderateSolvedChallenges,
          // totalHardSolvedChallenges: hardSolvedChallenges,
        },
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

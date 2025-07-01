import { Request, Response } from "express";
import { CoderModel } from "../models/Coder";

export const leaderboardController = {
  getLeaderboard: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role === "manager") {
        res.status(403).json("User must be coder to see the Leaderboard");
        return;
      }
      const coders = await CoderModel.find()
        .sort({ score: -1 })
        .populate({
          path: "submission",
          match: { status: "passed" },
        });
      console.log(coders);

      res.status(200).json({ data: coders });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

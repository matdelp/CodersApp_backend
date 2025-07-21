import { Request, Response } from "express";
import { ChallengeModel } from "../models/Challenge";
import { CoderModel } from "../models/Coder";
import { SubmissionPassedWithChallengeLevel } from "../types";

export const solvedChallengesController = {
  getSolvedChallenges: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role !== "coder") {
        res.status(403).json("User must be coder to see this content");
        return;
      }

      const [
        totalEasyChallenges,
        totalModerateChallenges,
        totalHardChallenges,
      ] = await Promise.all([
        ChallengeModel.countDocuments({ level: "Easy" }),
        ChallengeModel.countDocuments({ level: "Moderate" }),
        ChallengeModel.countDocuments({ level: "Hard" }),
      ]);

      const coder = (await CoderModel.findById(userId)
        .populate({
          path: "submission",
          match: { status: "passed" },
          populate: {
            path: "challenge_id",
            model: "Challenge",
            select: "level",
          },
        })
        .lean()
        .exec()) as unknown as {
        submission: SubmissionPassedWithChallengeLevel;
      };

      if (!coder) {
        res.status(404).json({ message: "Coder not found" });
        return;
      }

      let totalEasySolvedChallenges = 0;
      let totalModerateSolvedChallenges = 0;
      let totalHardSolvedChallenges = 0;

      for (const sub of coder.submission) {
        const challenge = sub.challenge_id;
        if (!challenge || !challenge.level) continue;

        switch (challenge.level) {
          case "Easy":
            totalEasySolvedChallenges++;
            break;
          case "Moderate":
            totalModerateSolvedChallenges++;
            break;
          case "Hard":
            totalHardSolvedChallenges++;
            break;
        }
      }

      res.status(200).json({
        data: {
          totalEasyChallenges,
          totalModerateChallenges,
          totalHardChallenges,
          totalEasySolvedChallenges,
          totalModerateSolvedChallenges,
          totalHardSolvedChallenges,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

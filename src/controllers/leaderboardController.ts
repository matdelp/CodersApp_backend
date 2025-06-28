import { Request, Response } from "express";
import { leaderboard } from "../data"; //fetch from db later

export const leaderboardController = {
  getLeaderboard: async (req: Request, res: Response) => {
    try {
      res.json({ message: "Leaderbord :", data: leaderboard });
    } catch (error) {}
  },
};

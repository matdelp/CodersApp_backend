import express from "express";
import { leaderboardController } from "../controllers/leaderboardController";
import { auth } from "../middleware/authorization";

export const leaderboardRouter = express.Router();

leaderboardRouter.get("/", auth, leaderboardController.getLeaderboard);

import express from "express";
import { leaderboardController } from "../controllers/leaderboardController";


export const leaderboardRouter = express.Router();

leaderboardRouter.get("/", leaderboardController.getLeaderboard);

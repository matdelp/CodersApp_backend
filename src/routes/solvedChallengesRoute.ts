import express from "express";
import { solvedChallengesController } from "../controllers/solvedChallengesController";

export const solvedChallengesRouter = express.Router();

solvedChallengesRouter.get("/", solvedChallengesController.getSolvedChallenges);

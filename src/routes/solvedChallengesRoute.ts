import express from "express";
import { solvedChallengesController } from "../controllers/solvedChallengesController";
import { auth } from "../middleware/authorization";

export const solvedChallengesRouter = express.Router();

solvedChallengesRouter.get(
  "/",
  auth,
  solvedChallengesController.getSolvedChallenges
);

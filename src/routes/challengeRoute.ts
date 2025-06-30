import express from "express";
import { challengeController } from "../controllers/challengeController";

export const challengeRouter = express.Router();

challengeRouter.post("/create", challengeController.createChallenge);
// challengeRouter.get("/categories", challengeController.getAllCategories);
// challengeRouter.get("/:id", challengeController.getChallengeById);
// challengeRouter.get("/", challengeController.getAllChallenges);


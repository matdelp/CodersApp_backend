import express from "express";
import { challengeController } from "../controllers/challengeController";
import { auth } from "../middleware/authorization";

export const challengeRouter = express.Router();

challengeRouter.post("/create", auth, challengeController.createChallenge);
challengeRouter.get("/categories", challengeController.getAllCategories);
challengeRouter.get("/:id", challengeController.getChallengeById);
challengeRouter.get("/", auth, challengeController.getAllChallenges);

import express from "express";
import { challengeController } from "../controllers/challengeController";

export const challengeRouter = express.Router();

challengeRouter.post("/register", challengeController.createChallenge);
challengeRouter.get("/", challengeController.getAllChallenges);
challengeRouter.get("/:id", challengeController.getChallengeById);
// coderRouter.post("/login", coderController.loginCoder);
// coderRouter.patch("/profile/update", coderController.updateInfoCoder);

import express from "express";
import { challengeController } from "../controllers/challengeController";

export const challengeRouter = express.Router();

challengeRouter.post("/register", challengeController.createChallenge);
// coderRouter.post("/login", coderController.loginCoder);
// coderRouter.get("/profile/:id", coderController.getInfoCoder);
// coderRouter.patch("/profile/update", coderController.updateInfoCoder);

import express from "express";
import { coderController } from "../controllers/coderController";
import { auth } from "../middleware/authorization";

export const coderRouter = express.Router();

coderRouter.post("/register", coderController.createCoder);
coderRouter.post("/login", coderController.loginCoder);
coderRouter.post("/submit", auth, coderController.submitCode);
coderRouter.get("/profile", auth, coderController.getCoderProfile);
coderRouter.patch("/update", auth, coderController.updateProfileCoder);

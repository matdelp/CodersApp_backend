import express from "express";
import { coderController } from "../controllers/coderController";

export const coderRouter = express.Router();

coderRouter.post("/register", coderController.createCoder);
coderRouter.post("/login", coderController.loginCoder);

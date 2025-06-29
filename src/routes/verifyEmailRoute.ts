import express from "express";
import { verifyEmailController } from "../controllers/verifyEmailController";

export const verifyEmailRouter = express.Router();

verifyEmailRouter.get("/verify", verifyEmailController.verifyEmail);

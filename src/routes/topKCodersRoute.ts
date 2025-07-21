import express from "express";
import { topKCodersController } from "../controllers/topKCodersController";
import { auth } from "../middleware/authorization";

export const topKCodersRouter = express.Router();

topKCodersRouter.get("/", auth, topKCodersController.getTopKCoders);

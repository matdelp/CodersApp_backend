import express from "express";
import { topKCodersController } from "../controllers/topKCodersController";


export const topKCodersRouter = express.Router();

topKCodersRouter.get("/", topKCodersController.getTopKCoders);

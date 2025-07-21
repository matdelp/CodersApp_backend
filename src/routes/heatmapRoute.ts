import express from "express";
import { heatmapController } from "../controllers/heatmapController";
import { auth } from "../middleware/authorization";

export const heatmapRouter = express.Router();

heatmapRouter.get("/", auth, heatmapController.getHeatmap);

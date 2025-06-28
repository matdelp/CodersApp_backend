import express from "express";
import { heatmapController } from "../controllers/heatmapController";

export const heatmapRouter = express.Router();

heatmapRouter.get("/", heatmapController.getHeatmap);

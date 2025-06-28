import express from "express";
import { trendingCategoriesController } from "../controllers/trendingCategoriesController";

export const trendingCategoriesRouter = express.Router();

trendingCategoriesRouter.get("/", trendingCategoriesController.getTrendingCategories);

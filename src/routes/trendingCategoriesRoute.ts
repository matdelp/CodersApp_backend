import express from "express";
import { trendingCategoriesController } from "../controllers/trendingCategoriesController";
import { auth } from "../middleware/authorization";

export const trendingCategoriesRouter = express.Router();

trendingCategoriesRouter.get(
  "/",
  auth,
  trendingCategoriesController.getTrendingCategoriesbyUser
);

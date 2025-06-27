import express from "express";
import { managerController } from "../controllers/managerController";

export const managerRouter = express.Router();

managerRouter.post("/", managerController.createManager);

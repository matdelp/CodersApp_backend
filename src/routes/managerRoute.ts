import express from "express";
import { managerController } from "../controllers/managerController";

export const managerRouter = express.Router();

managerRouter.post("/register", managerController.createManager);
managerRouter.get("/login", managerController.loginManager);

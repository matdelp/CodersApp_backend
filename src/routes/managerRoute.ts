import express from "express";
import { managerController } from "../controllers/managerController";

export const managerRouter = express.Router();

managerRouter.post("/register", managerController.createManager);
managerRouter.post("/login", managerController.loginManager);
managerRouter.get("/profile/id", managerController.getInfoManager);
managerRouter.patch("/profile/update", managerController.updateInfoManager);

import express from "express";
import { managerController } from "../controllers/managerController";
import { auth } from "../middleware/authorization";

export const managerRouter = express.Router();

managerRouter.post("/register", managerController.createManager);
managerRouter.post("/login", managerController.loginManager);
managerRouter.get("/profile", auth, managerController.getManagerProfile);
// managerRouter.patch("/profile/update/:id", managerController.updateInfoManager);

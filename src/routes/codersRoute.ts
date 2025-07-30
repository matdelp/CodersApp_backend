import express from "express";
import multer from "multer";
import { coderController } from "../controllers/coderController";
import { auth } from "../middleware/authorization";

export const coderRouter = express.Router();

coderRouter.post("/register", coderController.createCoder);
coderRouter.post("/login", coderController.loginCoder);
coderRouter.post("/submit", auth, coderController.submitCode);
coderRouter.get("/profile", auth, coderController.getCoderProfile);
coderRouter.patch(
  "/update",
  auth,
  multer({ storage: multer.memoryStorage() }).single("avatar"),
  coderController.updateProfileCoder
);

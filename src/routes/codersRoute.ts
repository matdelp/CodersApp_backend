
import express from "express";
import { coderController } from "../controllers/coderController";

export const coderRouter = express.Router();

coderRouter.post("/", coderController.createCoder);

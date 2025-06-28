import express from "express";
import { submissionController } from "../controllers/submissionController";

export const submissionRouter = express.Router();

submissionRouter.post("/", submissionController.createSubmission);
import { Request, Response } from "express";
import Joi from "joi";

import { CoderModel } from "../models/Coder";

const topkcodersSchema = Joi.object({
  k: Joi.number(),
});

export const topKCodersController = {
  getTopKCoders: async (req: Request, res: Response) => {
    try {
      const { role } = (req as any).user;
      if (role === "manager") {
        res.status(403).json("User must be coder to see the Leaderboard");
        return;
      }
      const { error, value } = topkcodersSchema.validate(req.query);
      const { k } = value;
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const topKcoders = await CoderModel.find().sort({ score: -1 }).limit(k);
      res.status(200).json(topKcoders);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

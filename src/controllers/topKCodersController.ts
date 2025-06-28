import { Request, Response } from "express";
import Joi from "joi";
import { topKcoders } from "../data"; //fetch from db later

const topkcodersSchema = Joi.object({
  k: Joi.number(),
});

export const topKCodersController = {
  getTopKCoders: async (req: Request, res: Response) => {
    try {
      const { error, value } = topkcodersSchema.validate(req.query);
      const { k } = value;
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const selectedCoders = topKcoders.filter(
        (coder) => coder.k === Number(k)
      );
      res.status(200).json({
        message: `Top K coders`,
        data: selectedCoders,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

import { Request, Response } from "express";
import { coders, topKcoders } from "../data"; //fetch from db later
import { createToken, encryptPasword, validatePassword } from "../utils";
import Joi from "joi";

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
      res.json({
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

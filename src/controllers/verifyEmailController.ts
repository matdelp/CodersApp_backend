import { Request, Response } from "express";
import { CoderModel } from "../models/Coder";
import jwt from "jsonwebtoken";

export const verifyEmailController = {
  verifyEmail: async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Token missing or invalid." });
      }

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await CoderModel.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (user.is_verified) {
        return res.status(200).json({ message: "User already verified." });
      }

      user.is_verified = true;
      await user.save();

      res.status(200).send(`<p>Email verified successfully!`);
    } catch (err: any) {
      res.status(400).json({ message: "Invalid or expired token." });
    }
  },
};

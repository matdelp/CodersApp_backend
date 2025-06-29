import { Request, Response } from "express";
import { coders } from "../data"; //fetch from db later
import { coderSchema, loginSchema, updateSchema } from "../schema/schemaJoi";
import { createToken, encryptPasword, validatePassword } from "../utils";
import { CoderModel } from "../models/Coder";

export const coderController = {
  createCoder: async (req: Request, res: Response) => {
    try {
      const { error, value } = coderSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { firstName, lastName, email, password, avatar, description } =
        value;
      const checkEmail = await CoderModel.findOne({email});
      if (checkEmail) throw new Error("email already used to register");
      const hashedPswd = await encryptPasword(password);
      const newCoder = await CoderModel.create({
        firstName,
        lastName,
        email,
        password: hashedPswd,
        avatar,
        description,
        score: 0,
      });
      res.status(201).json({
        message: `User ${firstName} ${lastName} created successfully`,
        data: newCoder._id,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  loginCoder: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      const { email, password } = value;

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const coder = coders.find((coder) => coder.email === email);
      if (!coder) throw new Error("Invalid Credentials");

      const isMatching = await validatePassword(password, coder.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(coder);
      res.status(200).json({
        message: `User ${email} logged in successfully`,
        token: token,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  getInfoCoder: async (req: Request, res: Response) => {
    const coderId = req.params.id;
    const coder = coders.find((coder) => coder._id === Number(coderId));

    if (!coder) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(coder);
  },

  updateInfoCoder: async (req: Request, res: Response) => {
    const { error, value } = updateSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { firstName, lastName, avatar, description } = value;
    const coderId = req.params.id;
    const coder = coders.find((coder) => coder._id === Number(coderId));
    if (!coder) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    coder.firstName = firstName;
    coder.lastName = lastName;
    coder.avatar = avatar;
    coder.description = description;

    res.status(200).json({
      message: `${firstName}'s profile updated successfully`,
      coder: coder,
    });
  },
};

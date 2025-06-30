import { Request, Response } from "express";
import { coders } from "../data"; //fetch from db later
import { CoderModel } from "../models/Coder";
import { coderSchema, loginSchema, updateSchema } from "../schema/schemaJoi";
import {
  createToken,
  createTokenForRegistration,
  encryptPasword,
  sendMail,
  validatePassword,
} from "../utils";

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
      const checkEmail = await CoderModel.findOne({ email });
      if (checkEmail) {
        res.status(400).json({ message: "email already used to register" });
        return;
      }
      const hashedPswd = await encryptPasword(password);
      const newCoder = await CoderModel.create({
        firstName,
        lastName,
        email,
        password: hashedPswd,
        avatar,
        description,
        score: 0,
        is_verified: false,
      });
      const regId = newCoder._id.toString();
      const token = createTokenForRegistration(regId, "coder");

      sendMail(email, firstName, token);
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
      const coder = await CoderModel.findOne({ email });
      if (!coder) throw new Error("Invalid Credentials");
      if (!coder.is_verified) throw new Error("Email has not been verified");
      const isMatching = await validatePassword(password, coder.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(coder._id.toString(), email);
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
  //not updated yet
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

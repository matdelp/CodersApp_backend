import Joi from "joi";
import { coders } from "../data"; //fetch from db later
import { Request, Response } from "express";
import { createToken, encryptPasword, validatePassword } from "../utils";

const coderSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const coderController = {
  createCoder: async (req: Request, res: Response) => {
    const { error, value } = coderSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { firstName, lastName, email, password, avatar, description } = value;
    const hashedPswd = await encryptPasword(password);
    const newCoder = {
      _id: coders.length + 1, //simulate id generation before I have a db
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPswd,
      avatar: avatar,
      description: description,
      score: 0,
    };
    coders.push(newCoder);
    res.status(201).json({
      message: `User ${firstName} ${lastName} created successfully`,
    });
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
    const { error, value } = coderSchema.validate(req.body);
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

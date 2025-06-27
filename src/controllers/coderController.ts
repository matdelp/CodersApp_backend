import Joi from "joi";
import { coders } from "../data"; //fetch from db later
import { Request, Response } from "express";

const coderSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

export const coderController = {
  createCoder: (req: Request, res: Response) => {
    const { error, value } = coderSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { firstName, lastName, email, password, avatar, description } = value;
    const newCoder = {
      id: coders.length + 1, //simulate id generation before I have a db
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: avatar,
      description: description,
      score: 0,
    };
    coders.push(newCoder);
    res.status(201).json({
      message: `User ${firstName} ${lastName} created successfully`,
      data: coders,
    });
  },
};

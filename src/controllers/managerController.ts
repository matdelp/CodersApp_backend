import { Request, Response } from "express";
import { managers } from "../data"; //fetch from db later
import Joi from "joi";

const managerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
});

export const managerController = {
  createManager: (req: Request, res: Response) => {
    const { error, value } = managerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { firstName, lastName, email, password, avatar } = value;
    const newManager = {
      id: managers.length + 1, //simulate id generation before I have a db
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: avatar,
    };
    managers.push(newManager);
    res.status(201).json({
      message: `User ${firstName} ${lastName} created successfully`,
      data: managers,
    });
  },
};

import { coders } from "../data"; //fetch from db later
import { Request, Response } from "express";

export const coderController = {
  createCoder: (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({ error: "Missing information to create user" });
      return;
    }
    const { firstName, lastName, email, password, avatar, description } =
      req.body;

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
    res.json({
      message: `User ${firstName} ${lastName} created successfully`,
      data: coders,
    });
  },
};

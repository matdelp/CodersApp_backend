import { Request, Response } from "express";
import { managers } from "../data"; //fetch from db later

export const managerController = {
  createManager: (req: Request, res: Response) => {
    if (!req.body) {
      res.status(400).json({ error: "Missing information to create user" });
      return;
    }
    const { firstName, lastName, email, password, avatar } = req.body;
    const newManager = {
      id: managers.length + 1, //simulate id generation before I have a db
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: avatar,
    };
    managers.push(newManager);
    res.json({
      message: `User ${firstName} ${lastName} created successfully`,
      data: managers,
    });
  },
};

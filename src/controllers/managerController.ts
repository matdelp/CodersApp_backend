import { Request, Response } from "express";
import { coders, managers } from "../data"; //fetch from db later
import Joi from "joi";
import { createToken, encryptPasword, validatePassword } from "../utils";
import { loginSchema } from "./coderController";

const managerSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  avatar: Joi.string().uri().optional(),
});

//Register endpoint
export const managerController = {
  createManager: async (req: Request, res: Response) => {
    try {
      const { error, value } = managerSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { firstName, lastName, email, password, avatar } = value;
      const hashedPswd = await encryptPasword(password);
      const newManager = {
        _id: managers.length + 1, //simulate id generation before I have a db
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPswd,
        avatar: avatar,
      };
      managers.push(newManager);
      res.status(201).json({
        message: `User ${firstName} ${lastName} created successfully`,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  //Login endpoint
  loginManager: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      const { email, password } = value;
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const manager = managers.find((manager) => manager.email === email);
      if (!manager) throw new Error("Invalid Credentials");
      const isMatching = await validatePassword(password, manager.password);
      if (!isMatching) throw new Error("Invalid Credentials");
      const token = createToken(manager);
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

  //Profile endpoint
  getInfoManager: async (req: Request, res: Response) => {
    const managerId = req.params.id;
    console.log(req.params.id);
    const manager = managers.find(
      (manager) => manager._id === Number(managerId)
    );

    if (!manager) {
      res.status(404).json({ error: "user not found" });
      return;
    }
    res.status(200).json(manager);
  },

  //Update Profile endpoint
  updateInfoCoder: async (req: Request, res: Response) => {
    const { error, value } = managerSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { firstName, lastName, avatar } = value;
    const managerId = req.params.id;
    const manager = managers.find(
      (manager) => manager._id === Number(managerId)
    );
    if (!manager) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    manager.firstName = firstName;
    manager.lastName = lastName;
    manager.avatar = avatar;

    res.status(200).json({
      message: `${firstName}'s profile updated successfully`,
      manager: manager,
    });
  },
};

import { Request, Response } from "express";
import { managers } from "../data"; //fetch from db later
import { loginSchema, managerSchema, updateSchema } from "../schema/schemaJoi";
import {
  createToken,
  createTokenForRegistration,
  encryptPasword,
  sendMail,
  validatePassword,
} from "../utils";
import { ManagerModel } from "../models/Manager";

export const managerController = {
  createManager: async (req: Request, res: Response) => {
    try {
      const { error, value } = managerSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const { firstName, lastName, email, password, avatar } = value;
      const checkEmail = await ManagerModel.findOne({ email });
      if (checkEmail) throw new Error("email already used to register");

      const hashedPswd = await encryptPasword(password);
      const newManager = await ManagerModel.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPswd,
        avatar: avatar,
        challenges: [],
        is_verified: false,
      });
      const regId = newManager._id.toString();
      const token = createTokenForRegistration(regId, "manager");

      sendMail(email, firstName, token);
      res.status(201).json({
        message: `User ${firstName} ${lastName} created successfully`,
        data: newManager._id,
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  loginManager: async (req: Request, res: Response) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      const { email, password } = value;
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const manager = await ManagerModel.findOne({ email });
      if (!manager) throw new Error("Invalid Credentials");
      if (!manager.is_verified) throw new Error("Email has not been verified");
      const isMatching = await validatePassword(password, manager.password);
      if (!isMatching) throw new Error("Invalid Credentials");

      const token = createToken(manager._id.toString(), email, "manager");
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

  //TODO
  //not updated yet
  //Profile endpoint
  getInfoManager: async (req: Request, res: Response) => {
    try {
      const managerId = req.params.id;
      const manager = managers.find(
        (manager) => manager._id === Number(managerId)
      );

      if (!manager) {
        res.status(404).json({ error: "user not found" });
        return;
      }
      res.status(200).json(manager);
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },

  //Update Profile endpoint
  updateInfoManager: async (req: Request, res: Response) => {
    try {
      const { error, value } = updateSchema.validate(req.body);
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
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};

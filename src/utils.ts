import bcrypt from "bcrypt";
import { User } from "./data";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const encryptPasword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const validatePassword = async (inputPswd: string, password: string) => {
  // const crypted = await bcrypt.compare(inputPswd, password); //ToDO once all password are encrypted in db
  if (inputPswd !== password) return false;
  return true;
};

export const createToken = (user: User) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const jwtToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "30d",
    }
  );
  return jwtToken;
};

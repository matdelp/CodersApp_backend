import bcrypt from "bcrypt";
import { User } from "./data";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
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

export const createTokenForRegistration = (id: string, role: string) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  return token;
};

export const sendMail = async (
  email: string,
  firstName: string,
  token: string
) => {
  const verificationUrl = `http://localhost:${process.env.PORT}/api/verify?token=${token}`;
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"My App" <no-reply@myapp.com>',
    to: email,
    subject: "Verify Your Email",
    html: `
    <p>Hello ${firstName},</p>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `,
  };

  await transporter.sendMail(mailOptions);
};

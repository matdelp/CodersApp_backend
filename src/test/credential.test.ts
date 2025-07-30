import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { CoderModel } from "../models/Coder";
import { createToken, validatePassword } from "../utils";

jest.mock("../models/Coder");
jest.mock("../utils");

describe("POST /coders/login credential validation", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      mongoose.connection.once("open", resolve);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 401 if user not found", async () => {
    (CoderModel.findOne as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/coders/login")
      .send({ email: "email@example.com", password: "password123" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it("should return 401 if user not verified", async () => {
    (CoderModel.findOne as jest.Mock).mockResolvedValue({
      email: "email@example.com",
      password: "hashedPassword",
      is_verified: false,
    });

    (validatePassword as jest.Mock).mockResolvedValue(true);

    const res = await request(app)
      .post("/coders/login")
      .send({ email: "email@example.com", password: "password123" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/email has not been verified/i);
  });

  it("should return 401 if password does not match", async () => {
    (CoderModel.findOne as jest.Mock).mockResolvedValue({
      email: "coder.test@example.com",
      password: "somehashedpassword",
      is_verified: true,
    });

    (validatePassword as jest.Mock).mockResolvedValue(false);

    const res = await request(app)
      .post("/coders/login")
      .send({ email: "coder.test@example.com", password: "incorrectPswd" });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/invalid credentials/i);
  });

  it("should return 200 and token if login is successful", async () => {
    (CoderModel.findOne as jest.Mock).mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      email: "coder.test@example.com",
      is_verified: true,
      password: "hashedpassword",
    });

    (validatePassword as jest.Mock).mockResolvedValue(true);
    (createToken as jest.Mock).mockReturnValue("mocked-jwt-token");

    const res = await request(app)
      .post("/coders/login")
      .send({ email: "coder.test@example.com", password: "password123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token", "mocked-jwt-token");
  });
});

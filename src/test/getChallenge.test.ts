import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { ChallengeModel } from "../models/Challenge";
import jwt from "jsonwebtoken";

const generateTestToken = () => {
  return jwt.sign(
    { id: "user-id", email: "test@example.com", role: "coder" },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

jest.mock("../models/Challenge");

describe("GET /challenges get challenge if login", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      mongoose.connection.once("open", resolve);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 200 and challenges if token has role coder", async () => {
    const token = generateTestToken();
    const mockChallenges = [
      { _id: "1", title: "Challenge One", category: "Frontend" },
      { _id: "2", title: "Challenge Two", category: "Backend" },
    ];

    (ChallengeModel.find as jest.Mock).mockResolvedValue(mockChallenges);

    const res = await request(app)
      .get("/challenges")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockChallenges);

    expect(ChallengeModel.find).toHaveBeenCalledWith({});
  });
});

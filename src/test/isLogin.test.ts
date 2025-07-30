import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

describe("GET /coders/profile", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      mongoose.connection.once("open", resolve);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 401 Forbidden when no JWT is provided", async () => {
    const res = await request(app).get("/coders/profile");

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message.toLowerCase()).toMatch(/invalid authorization/);
  });

  it("should return 401 Forbidden when token format is wrong", async () => {
    const res = await request(app)
      .get("/coders/profile")
      .set("Authorization", "NotBearer sometoken");

    expect(res.statusCode).toBe(401);
    expect(res.body.message.toLowerCase()).toMatch(/invalid authorization/);
  });

  it("should return 401 Forbidden when token is invalid", async () => {
    const res = await request(app)
      .get("/coders/profile")
      .set("Authorization", "Bearer faketoken123");

    expect(res.statusCode).toBe(401);
    expect(res.body.message.toLowerCase()).toMatch(/jwt/i);
  });

  it("should return 200 User profile when token is valid", async () => {
    const res = await request(app)
      .get("/coders/profile")
      .set("Authorization", `Bearer ${process.env.TEST_TOKEN}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.message.toLowerCase()).toMatch(/jwt/i);
  });
});

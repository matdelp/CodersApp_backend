import request from "supertest";
import app from "../app";
import mongoose from "mongoose";

describe("GET /coders/login Body Validation", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      mongoose.connection.once("open", resolve);
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 400 Bad Request if password is missing in body", async () => {
    const invalidBody = {
      email: "test@example.com",
    };

    const res = await request(app).post("/coders/login").send(invalidBody);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/password/i);
  });

  it("should return 400 Bad Request if email is missing in body", async () => {
    const invalidBody = {
      password: "mypassword",
    };

    const res = await request(app).post("/coders/login").send(invalidBody);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/email/i);
  });

  it("should return 400 Bad Request if email is invalid", async () => {
    const invalidBody = {
      email: "not-an-email",
      password: "mypassword",
    };

    const res = await request(app).post("/coders/login").send(invalidBody);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/email/i);
  });
  it("should return 400 Bad Request if password is invalid", async () => {
    const invalidBody = {
      email: "email@example.com",
      password: "my",
    };

    const res = await request(app).post("/coders/login").send(invalidBody);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/password/i);
  });
});

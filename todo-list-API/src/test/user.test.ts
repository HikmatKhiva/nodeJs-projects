import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../db/db.js";

describe("User API test", () => {
  const email = "john@test.com";

  beforeAll(async () => {
    await prisma.users.deleteMany({
      where: { email },
    });

    await request(app).post("/register").send({
      name: "John",
      email,
      password: "password",
    });
  });

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { email },
    });
  });

  it("User login successfully", async () => {
    const response = await request(app).post("/login").send({
      email,
      password: "password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should fail with wrong password", async () => {
    const response = await request(app).post("/login").send({
      email,
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });
});
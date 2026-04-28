import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Weather API", () => {
  it("should return 400 when city is missing", async () => {
    const res = await request(app).get("/api/weather");
    expect(res.status).toBe(400);
  });

  it("should return 200 for a valid request", async () => {
    // Note: You might need to mock your fetch call here!
    const response = await request(app).get("/api/weather?city=Tashkent");
    expect(response.status).toBe(200);
  });
});

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../db/db.js";

describe("Todo API", () => {
  let token: string;
  const { name, email, password } = {
    name: "user",
    email: "user@test.com",
    password: "password",
  };
  beforeAll(async () => {
    await prisma.users.deleteMany({
      where: { email },
    });
    await request(app).post("/register").send({
      name,
      email,
      password,
    });

    const loginRes = await request(app).post("/login").send({
      email,
      password,
    });
    token = loginRes.body.token;
  });

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: { email },
    });
  });

  it("Should return todos", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("Should create new todo", async () => {
    const createTodo = await request(app)
      .post("/todos")
      .send({
        title: "Test todo",
        description: "Test content",
      })
      .set("Authorization", `Bearer ${token}`);
    const todoId = createTodo.body.id;
    expect(createTodo.status).toBe(201);
    expect(createTodo.body.title).toBe("Test todo");
    await request(app).delete(`/todos/${todoId}`);
  });

  it("Should update todo", async () => {
    const createTodo = await request(app)
      .post("/todos")
      .send({
        title: "Test todo",
        description: "Test content",
      })
      .set("Authorization", `Bearer ${token}`);
    const todoId = createTodo.body.id;
    const updatedTodo = await request(app)
      .put(`/todos/${todoId}`)
      .send({
        title: "Updated todo",
        description: "Updated description",
      })
      .set("Authorization", `Bearer ${token}`);
    expect(updatedTodo.body.title).toBe("Updated todo");
    expect(updatedTodo.status).toBe(200);
    await request(app).delete(`/todos/${todoId}`);
  });
});
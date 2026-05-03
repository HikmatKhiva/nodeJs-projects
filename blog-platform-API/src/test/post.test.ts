import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../db/db.js";

afterEach(async () => {
  await prisma.post.deleteMany();
});

describe("Posts API", () => {
  it("Should return posts", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it("Should return post", async () => {
    const createPost = await request(app)
      .post("/posts")
      .send({
        title: "Test post",
        content: "Test content",
        category: "Test category",
        tags: ["Vitest"],
      });
    const postId = createPost.body.id;
    const response = await request(app).get(`/posts/${postId}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Test post");
  });

  it("It should return 404 if post doesn't exist", async () => {
    const response = await request(app).get("/posts/9999");
    expect(response.status).toBe(404);
  });
  it("Should create a post", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Test",
        content: "Test content",
        category: "Tech",
        tags: ["Nodejs"],
      });
    expect(response.status).toBe(201);
  });
  it("should delete a post", async () => {
    const createPost = await request(app)
      .post("/posts")
      .send({
        title: "Delete test",
        content: "Delete test",
        category: "Delete test",
        tags: ["Delete test"],
      });
    const postId = createPost.body.id;
    const response = await request(app).delete(`/posts/${postId}`);
    expect(response.status).toBe(204);
  });
});
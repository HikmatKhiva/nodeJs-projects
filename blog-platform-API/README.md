# 📝 Blogging Platform API

A RESTful API for a personal blogging platform built with **Node.js**, **Express**, **Prisma**, **Redis**, and **TypeScript**.

## This API allows users to create, read, update, delete, and search blog posts.

**Project URLs:**

- [GitHub - Blogging Platform API](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/blog-platform-API)
- [Roadmap](https://roadmap.sh/projects/blogging-platform-api)

---

## 🚀 Features

- Create a new blog post
- Get all blog posts
- Get a single blog post by ID
- Update an existing blog post
- Delete a blog post
- Search posts by term (title, content, category)
- Input validation using Zod
- Global error handling
- Redis caching for performance
- API testing with Vitest & Supertest

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (or any Prisma-supported database)
- Redis
- Zod (validation)
- Vitest + Supertest (testing)

---

## 📦 Installation

```bash
git clone https://github.com/HikmatKhiva/nodeJs-projects/tree/main/weather-API
cd blog-platform-API

npm install

# project build
npm run build

#  server run
npm run start

# with docker run
npm run docker
```

```env
DATABASE_URL=your_database_url
REDIS_URL=your_redis_url
PORT=5000

```

```json
POST /posts

{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"]
}

GET /posts

{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my blog post.",
  "category": "Technology",
  "tags": ["Tech", "Programming"],
  "createdAt": "2026-05-02T10:00:00.000Z",
  "updatedAt": "2026-05-02T10:00:00.000Z"
}
```

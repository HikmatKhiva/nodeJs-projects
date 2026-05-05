# 📝 Todo List REST API

A RESTful API built with **Node.js, Express, Prisma, JWT authentication, and PostgreSQL** that allows users to manage their personal todo list.

**Project URLs:**

- [GitHub - Blogging Platform API](https://github.com/HikmatKhiva/nodeJs-projects/tree/main/todo-list-API)
- [Roadmap](https://roadmap.sh/projects/todo-list-api)

---

## 🚀 Features

- User Registration & Login (JWT Authentication)
- Secure password hashing (bcrypt)
- CRUD operations for todos
- Authorization (users can only access their own todos)
- Pagination for todos
- Input validation (Zod)
- Error handling middleware
- Prisma ORM with PostgreSQL
- Integration testing (Vitest + Supertest)
- Docker support (optional)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- Zod (validation)
- Vitest + Supertest (testing)
- Docker (optional)

---


### 📦 Installation
```bash
git clone https://github.com/HikmatKhiva/nodeJs-projects/tree/main/todo-list-API
cd todo-list-API

npm install

# project build
npm run build

#  server run
npm run start

# with docker run
npm run docker
```

```env
POSTGRES_DB=example_db
POSTGRES_USER=example_user
POSTGRES_PASSWORD=example_password
DATABASE_URL="postgresql://example_user:example_password@db:5432/example_db"
REDIS_URL=redis://redis:6379
JWT_SECRET_KEY=example 

```
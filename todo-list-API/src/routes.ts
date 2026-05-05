import { Router } from "express";
import { signIn, signUp } from "./service/users.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "./service/todos.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import { validateBody } from "./middleware/validate.js";
import { todoCreateSchema, todoUpdateSchema } from "./validation/schemas.js";

export const routes = Router();

routes.post("/register", signUp);
routes.post("/login", signIn);

// todos
routes.get("/todos", authMiddleware, getAllTodos);
routes.post(
  "/todos",
  authMiddleware,
  validateBody(todoCreateSchema),
  createTodo,
);
routes.put(
  "/todos/:id",
  authMiddleware,
  validateBody(todoUpdateSchema),
  updateTodo,
);
routes.delete("/todos",authMiddleware, deleteTodo);

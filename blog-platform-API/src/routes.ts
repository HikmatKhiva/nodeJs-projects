import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
} from "./service/service.post.js";
import { validateBody } from "./middleware/validate.js";
import { createSchema } from "./validation/zod.js";
export const routes = Router();
routes.get("/", getAllPost);
routes.get("/:id", getPost);
routes.put("/:id", updatePost);
routes.delete("/:id", deletePost);
routes.post("/",validateBody(createSchema), createPost);

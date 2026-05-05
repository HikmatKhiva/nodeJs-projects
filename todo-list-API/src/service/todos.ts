import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/db.js";
import { AppError } from "../utils/appError.js";
import { getCache, invalidateTodoCache, setCache } from "../utils/cache.js";
import { todosSchema } from "../validation/schemas.js";
export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const { limit, page } = req.query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const cacheKey = `todos:${user?.id}:${pageNumber}:${limitNumber}`;
    const cachedData = await getCache(cacheKey, todosSchema);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }
    const todos = await prisma.todos.findMany({
      where: {
        userId: user?.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
      skip: (pageNumber - 1) * limitNumber,
      take: limitNumber,
    });
    const totalCount = await prisma.todos.count({
      where: { userId: user?.id },
    });
    const total = Math.ceil(totalCount / limitNumber);
    await setCache(cacheKey, {
      data: todos,
      page: pageNumber,
      limit: limitNumber,
      total,
    });
    return res
      .status(200)
      .json({ data: todos, page: pageNumber, limit: limitNumber, total });
  } catch (error) {
    next(error);
  }
};
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    if (!user) {
      throw new AppError("Unauthorized", 401);
    }
    const newTodo = await prisma.todos.create({
      data: {
        title,
        description,
        userId: user?.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
    await invalidateTodoCache(user?.id);
    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const id = Number(req.params.id);
    const todo = await prisma.todos.findUnique({
      where: { id },
    });
    if (!todo) {
      throw new AppError("Not found", 404);
    }
    if (todo.userId !== user?.id) {
      throw new AppError("Forbidden", 403);
    }
    const parsed = req.body;
    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: parsed,
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
    await invalidateTodoCache(user?.id);
    return res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const id = req.params;
    if (!user) throw new AppError("Unauthorized", 401);
    const todo = await prisma.todos.findUnique({
      where: { id: Number(id) },
    });
    if (!todo) {
      return res.status(404).json({ message: "Not found!" });
    }
    if (todo.userId !== user?.id) {
      throw new AppError("Forbidden", 403);
    }
    await prisma.todos.delete({
      where: { id: Number(id) },
    });
    await invalidateTodoCache(user?.id);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
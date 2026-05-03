import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/db.js";
import {
  postsArraySchema,
  postSchema,
  updateSchema,
} from "../validation/zod.js";
import { getCache, invalidatePostCache, setCache } from "../utils/cache.js";
export const getAllPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { term } = req.query;
    const termKey = typeof term === "string" ? term.trim().toLowerCase() : "";
    const cacheKey = `posts:all:${termKey || "all"}`;
    const cached = await getCache(cacheKey, postsArraySchema);
    if (cached) {
      return res.status(200).json(cached);
    }
    const filter = {
      OR: [
        {
          title: {
            contains: String(term),
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: String(term),
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: String(term),
            mode: "insensitive",
          },
        },
      ],
    };
    const posts = await prisma.post.findMany({
      where: term ? filter : {},
    });
    await setCache<IPost[]>(cacheKey, posts);
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const cachedKey = `post:${id}`;
    const cachedPost = await getCache(cachedKey, postSchema);
    if (cachedPost) {
      return res.status(200).json(cachedPost);
    }
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }
    await setCache<IPost>(cachedKey, post);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content, category, tags } = req.body;
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        category,
        tags,
      },
    });

    await invalidatePostCache();
    return res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }
    const data = updateSchema.parse(req.body);
    const updated = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data,
      select: {
        title: true,
        content: true,
        category: true,
        tags: true,
      },
    });
    await invalidatePostCache();
    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res.status(404).json({ message: "Not found" });
    }
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    await invalidatePostCache();
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

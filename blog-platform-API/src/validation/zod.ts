import { z } from "zod";
export const updateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const createSchema = z.object({
  title: z.string().min(1, "Title required").max(255),
  content: z.string().min(10, "Content too short"),
  category: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.coerce.date(),
  updateAt: z.coerce.date(),
});
export const postsArraySchema = z.array(postSchema);
export type CreatePostInput = z.infer<typeof createSchema>;

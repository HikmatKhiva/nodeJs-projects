import { z } from "zod";
export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
});
export const todoBaseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 chars").max(255),
  description: z.string().min(10, "Description must be at least 10 chars"),
});
export const todosSchema = z.object({
  data: z.array(todoSchema),
  page: z.number(),
  limit: z.number(),
  total: z.number(),
});

export const todoCreateSchema = todoBaseSchema.required();
export const todoUpdateSchema = todoBaseSchema
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

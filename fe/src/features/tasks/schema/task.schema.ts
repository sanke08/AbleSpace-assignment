import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  description: z.string().max(2000).optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

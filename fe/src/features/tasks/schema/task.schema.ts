import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  listId: z.cuid(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

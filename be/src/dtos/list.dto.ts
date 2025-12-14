import { z } from "zod";

export const copyListSchema = z.object({
  listId: z.string().uuid(),
  boardId: z.string().uuid(),
  workspaceId: z.string().uuid(), // was orgId before
});

export const listIdSchema = z.object({
  listId: z.string().uuid(),
});

export type CopyListInput = z.infer<typeof copyListSchema>;
export type ListIdInput = z.infer<typeof listIdSchema>;

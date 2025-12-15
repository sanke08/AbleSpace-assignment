import { z } from "zod";

export const copyListSchema = z.object({
  listId: z.uuid(),
  boardId: z.uuid(),
  workspaceId: z.uuid(), // was orgId before
});

export const listIdSchema = z.object({
  listId: z.uuid(),
  workspaceId: z.uuid(),
  boardId: z.uuid(),
  userId: z.uuid(),
});

export type CopyListInput = z.infer<typeof copyListSchema>;
export type ListIdInput = z.infer<typeof listIdSchema>;

import { z } from "zod";
import { Role } from "../prisma/generated/prisma/enums";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
});

export const updateMemberRoleSchema = z.object({
  role: z.nativeEnum(Role),
});

export const joinWorkspaceSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

export const generateInviteLinkSchema = z.object({}); // No body needed, just params

export type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;
export type UpdateWorkspaceInput = z.infer<typeof updateWorkspaceSchema>;
export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;

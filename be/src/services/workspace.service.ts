import * as workspaceRepository from "../repositories/workspace.repository.js";
import * as memberRepository from "../repositories/member.repository.js";
import {
  type CreateWorkspaceInput,
  type UpdateWorkspaceInput,
} from "../dtos/workspace.dto.js";
import { AppError } from "../utils/appError.js";
import { ROLE } from "../prisma/generated/prisma/enums.js";

export const createWorkspace = async ({
  userId,
  data,
}: {
  userId: string;
  data: CreateWorkspaceInput;
}) => {
  // Logic from nextjs: generate invite link (mocked or real)
  const inviteCode =
    "mock-invite-code-" + Math.random().toString(36).substring(7); // Simplified

  // Create workspace
  const workspace = await workspaceRepository.createWorkspace({
    creatorId: userId,
    data,
    inviteCode,
  });

  // Add creator as Admin
  await memberRepository.addMember({
    workspaceId: workspace.id,
    userId,
    role: ROLE.ADMIN,
  });

  return workspace;
};

export const getMyWorkspaces = async (userId: string) => {
  return await workspaceRepository.findWorkspacesByUserId({ userId });
};

export const updateWorkspace = async ({
  workspaceId,
  userId,
  data,
}: {
  workspaceId: string;
  userId: string;
  data: UpdateWorkspaceInput;
}) => {
  // Check if user is admin or member (logic from nextjs wasn't strict on role for update, but assuming Admin)
  const member = await memberRepository.findMember({ workspaceId, userId });
  if (!member || member.role !== ROLE.ADMIN) {
    throw new AppError("Not authorized to update workspace", 403);
  }

  return await workspaceRepository.updateWorkspace({ id: workspaceId, data });
};

export const deleteWorkspace = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  const member = await memberRepository.findMember({ workspaceId, userId });
  if (!member || member.role !== ROLE.ADMIN) {
    throw new AppError("Not authorized", 403);
  }
  return await workspaceRepository.deleteWorkspace({ id: workspaceId });
};

export const getWorkspaceById = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  return await workspaceRepository.findWorkspaceById({
    id: workspaceId,
    userId,
  });
};

export const getTrash = async ({
  userId,
  workspaceId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  return await workspaceRepository.findTrash({
    id: workspaceId,
    userId,
  });
};

export const getTasks = async ({
  workspaceId,
  userId,
}: {
  workspaceId: string;
  userId: string;
}) => {
  return await workspaceRepository.findTasks({
    id: workspaceId,
    userId,
  });
};

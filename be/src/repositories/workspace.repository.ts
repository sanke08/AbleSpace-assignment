import { db } from "../utils/db.js";
import {
  type CreateWorkspaceInput,
  type UpdateWorkspaceInput,
} from "../dtos/workspace.dto.js";

export const createWorkspace = async ({
  creatorId,
  data,
  inviteCode,
}: {
  creatorId: string;
  data: CreateWorkspaceInput;
  inviteCode: string;
}) => {
  return await db.workspace.create({
    data: {
      name: data.name,
      creatorId,
      inviteCode,
    },
  });
};

export const findWorkspaceById = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  return await db.workspace.findUnique({
    where: { id, members: { some: { userId } } },
  });
};

export const findWorkspacesByUserId = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.workspace.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });
};

export const updateWorkspace = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateWorkspaceInput;
}) => {
  return await db.workspace.update({
    where: { id },
    data,
  });
};

export const deleteWorkspace = async ({ id }: { id: string }) => {
  return await db.workspace.delete({
    where: { id },
  });
};

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
    include: {
      members: { include: { user: true } },
    },
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

export const findTrash = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const boards = await db.board.findMany({
    where: {
      workspaceId: id,
      trash: true,
      workspace: {
        members: {
          some: {
            userId,
          },
        },
      },
    },
  });

  const lists = await db.list.findMany({
    where: {
      trash: true,
      board: {
        workspaceId: id,
      },
    },
  });

  const tasks = await db.task.findMany({
    where: {
      trash: true,
      list: {
        board: {
          workspaceId: id,
        },
      },
    },
  });

  return { boards, lists, tasks };
};

export const findTasks = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  return await db.task.findMany({
    where: {
      assignee: {
        userId,
      },
    },
    include: {
      list: {
        select: {
          boardId: true,
          board: {
            select: {
              workspaceId: true,
            },
          },
        },
      },
    },
  });
};

import { db } from "../utils/db.js";
import { AppError } from "../utils/appError.js";
import { ACTION, ENTITY_TYPE, ROLE } from "../prisma/generated/prisma/enums.js";
import { io } from "../server.js";

export const createTask = async ({
  title,
  listId,
  boardId,
  userId,
}: {
  title: string;
  listId: string;
  boardId: string;
  userId: string;
}) => {
  const list = await db.list.findUnique({
    where: { id: listId },
    include: { board: true },
  });

  if (!list) throw new AppError("List not found", 404);

  const task = await db.task.create({
    data: {
      title,
      listId,
    },
  });

  io.to(`board:${boardId}`).emit("task:created", task);

  await db.auditLog.create({
    data: {
      workspaceId: list.board.workspaceId,
      entityId: task.id,
      entityType: ENTITY_TYPE.TASK,
      entityTitle: task.title,
      action: ACTION.CREATE,
      userId,
      userName: "snapshot",
      userImage: "",
    },
  });

  return task;
};

export const updateTask = async ({
  taskId,
  boardId,
  description,
  userId,
}: {
  taskId: string;
  boardId: string;
  description?: string;
  userId: string;
}) => {
  const task = await db.task.findUnique({
    where: { id: taskId },
    include: { list: { include: { board: true } } },
  });

  if (!task) throw new AppError("Task not found", 404);

  const data: { description?: string } = {};
  if (description) data.description = description;
  const updated = await db.task.update({
    where: { id: taskId },
    data,
  });

  io.to(`board:${boardId}`).emit("task:updated", updated);

  await db.auditLog.create({
    data: {
      workspaceId: task.list.board.workspaceId,
      entityId: updated.id,
      entityType: ENTITY_TYPE.TASK,
      entityTitle: updated.title,
      action: ACTION.UPDATE,
      userId,
      userName: "snapshot",
      userImage: "",
    },
  });

  return updated;
};

export const deleteTask = async ({
  taskId,
  boardId,
  userId,
}: {
  taskId: string;
  boardId: string;
  userId: string;
}) => {
  const task = await db.task.findUnique({
    where: { id: taskId },
    include: {
      list: {
        include: { board: { include: { workspace: true } } },
      },
    },
  });

  if (!task) throw new AppError("Task not found", 404);

  const member = await db.member.findFirst({
    where: {
      userId,
      workspaceId: task.list.board.workspaceId,
      role: ROLE.ADMIN,
    },
  });

  if (!member) throw new AppError("Not authorized", 403);

  const deleted = await db.task.delete({
    where: { id: taskId },
  });

  io.to(`board:${boardId}`).emit("task:deleted", deleted);

  await db.auditLog.create({
    data: {
      workspaceId: task.list.board.workspaceId,
      entityId: deleted.id,
      entityType: ENTITY_TYPE.TASK,
      entityTitle: deleted.title,
      action: ACTION.DELETE,
      userId,
      userName: "snapshot",
      userImage: "",
    },
  });
};

import * as listRepo from "../repositories/list.repository.js";
import * as memberRepo from "../repositories/member.repository.js";
import * as auditRepo from "../repositories/auditLog.repository.js";
import { AppError } from "../utils/appError.js";
import { ROLE } from "../prisma/generated/prisma/enums.js";
import { ENTITY_TYPE, ACTION } from "../prisma/generated/prisma/enums.js";
import { CopyListInput } from "../dtos/list.dto.js";
import { db } from "../utils/db.js";
import { io } from "../server.js";

export const copyList = async ({
  userId,
  data,
}: {
  userId: string;
  data: CopyListInput;
}) => {
  const list = await listRepo.findListWithCards({
    listId: data.listId,
    boardId: data.boardId,
    workspaceId: data.workspaceId,
  });
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: data.workspaceId,
  });
  if (!member) throw new AppError("Not a member of workspace", 403);

  const newList = await listRepo.createListCopy({
    boardId: data.boardId,
    title: `${list.title} - Copy`,
    tasks: list.tasks.map((t) => ({
      title: t.title,
      description: t.description || "",
    })),
  });

  await auditRepo.createAuditLog({
    workspaceId: data.workspaceId,
    entityId: newList.id,
    entityType: ENTITY_TYPE.LIST,
    entityTitle: newList.title,
    userId: userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
    action: ACTION.CREATE,
  });

  return newList;
};

export const trashList = async ({
  userId,
  listId,
}: {
  userId: string;
  listId: string;
}) => {
  const list = await listRepo.findListByIdWithWorkspace({ listId });
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: list.board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  await listRepo.updateListTrash({ listId, trash: true });
};

export const restoreList = async ({
  userId,
  listId,
}: {
  userId: string;
  listId: string;
}) => {
  const list = await listRepo.findListByIdWithWorkspace({ listId });
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: list.board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  await listRepo.updateListTrash({ listId, trash: false });

  await auditRepo.createAuditLog({
    workspaceId: list.board.workspaceId,
    entityId: list.id,
    entityType: ENTITY_TYPE.LIST,
    entityTitle: list.title,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
    action: ACTION.RESTORED,
  });
};

// export const deleteList = async ({
//   userId,
//   listId,
// }: {
//   userId: string;
//   listId: string;
// }) => {
//   const list = await listRepo.findListByIdWithWorkspace({ listId });
//   if (!list) throw new AppError("List not found", 404);

//   const member = await memberRepo.findMember({
//     userId,
//     workspaceId: list.board.workspaceId,
//   });
//   if (!member || member.role === ROLE.MEMBER)
//     throw new AppError("Not authorized", 403);

//   await listRepo.deleteListById({ listId });
// };

export const createList = async ({
  title,
  boardId,
  userId,
}: {
  title: string;
  boardId: string;
  userId: string;
}) => {
  const board = await db.board.findUnique({ where: { id: boardId } });
  if (!board) throw new AppError("Board not found", 404);

  const list = await db.list.create({
    data: {
      title,
      boardId,
    },
  });

  io.to(`board:${boardId}`).emit("list:created", list);

  await db.auditLog.create({
    data: {
      workspaceId: board.workspaceId,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.CREATE,
      userId,
      userName: "snapshot", // fetch once if needed
      userImage: "",
    },
  });

  return list;
};

export const updateList = async ({
  title,
  boardId,
  listId,
  userId,
  workspaceId,
}: {
  title: string;
  boardId: string;
  listId: string;
  userId: string;
  workspaceId: string;
}) => {
  const list = await db.list.findUnique({ where: { id: listId } });
  if (!list) throw new AppError("List not found", 404);

  const updated = await db.list.update({
    where: { id: listId },
    data: { title },
  });

  io.to(`board:${boardId}`).emit("list:updated", updated);

  await db.auditLog.create({
    data: {
      workspaceId,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: updated.title,
      action: ACTION.UPDATE,
      userId,
      userName: "snapshot",
      userImage: "",
    },
  });

  return updated;
};

export const deleteList = async ({
  boardId,
  listId,
  userId,
  workspaceId,
}: {
  boardId: string;
  listId: string;
  userId: string;
  workspaceId: string;
}) => {
  const list = await db.list.findUnique({ where: { id: listId } });
  if (!list) throw new AppError("List not found", 404);

  const deleted = await listRepo.deleteListById({ listId });

  io.to(`board:${boardId}`).emit("list:deleted", deleted);

  await auditRepo.createAuditLog({
    workspaceId,
    entityId: list.id,
    entityType: ENTITY_TYPE.LIST,
    entityTitle: list.title,
    userId,
    userName: "snapshot",
    userImage: "",
    action: ACTION.DELETE,
  });
};

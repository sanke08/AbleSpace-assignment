import * as boardRepo from "../repositories/board.repository.js";
import * as memberRepo from "../repositories/member.repository.js";
import * as auditRepo from "../repositories/auditLog.repository.js";
import { AppError } from "../utils/appError.js";
import { ROLE, ENTITY_TYPE, ACTION } from "../prisma/generated/prisma/enums.js";
import { UpdateBoardInput } from "../dtos/board.dto.js";

export const getBoards = async ({ name }: { name: string }) => {
  return boardRepo.findBoardsByName({ name });
};

export const createBoard = async ({
  userId,
  title,
  workspaceId,
}: {
  userId: string;
  title: string;
  workspaceId: string;
}) => {
  const exist = await boardRepo.findBoardsByName({ name: title });
  if (exist.length > 0) throw new AppError("Board already exists", 400);

  const member = await memberRepo.findMember({ userId, workspaceId });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  const board = await boardRepo.createBoard({ title, workspaceId });

  await auditRepo.createAuditLog({
    workspaceId,
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.CREATE,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
  });

  return board;
};

export const updateBoardService = async ({
  userId,
  id,
  title,
  imageUrl,
}: UpdateBoardInput & { userId: string }) => {
  const board = await boardRepo.findBoardById({ boardId: id });
  if (!board) throw new AppError("Board not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  const updated = await boardRepo.updateBoard(id, {
    title: title || "",
    imageUrl: imageUrl || "",
  });

  await auditRepo.createAuditLog({
    workspaceId: board.workspaceId,
    entityId: updated.id,
    entityTitle: updated.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.UPDATE,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
  });

  return updated;
};

export const trashBoard = async ({
  userId,
  boardId,
}: {
  userId: string;
  boardId: string;
}) => {
  const board = await boardRepo.findBoardById({ boardId });
  if (!board) throw new AppError("Board not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  await boardRepo.updateBoardTrash({ boardId, trash: true });

  await auditRepo.createAuditLog({
    workspaceId: board.workspaceId,
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.TRASHED,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
  });
};

export const restoreBoard = async ({
  userId,
  boardId,
}: {
  userId: string;
  boardId: string;
}) => {
  const board = await boardRepo.findBoardById({ boardId });
  if (!board) throw new AppError("Board not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  await boardRepo.updateBoardTrash({ boardId, trash: false });

  await auditRepo.createAuditLog({
    workspaceId: board.workspaceId,
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.RESTORED,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
  });
};

export const deleteBoardService = async ({
  userId,
  boardId,
}: {
  userId: string;
  boardId: string;
}) => {
  const board = await boardRepo.findBoardById({ boardId });
  if (!board) throw new AppError("Board not found", 404);

  const member = await memberRepo.findMember({
    userId,
    workspaceId: board.workspaceId,
  });
  if (!member || member.role === ROLE.MEMBER)
    throw new AppError("Not authorized", 403);

  await boardRepo.deleteBoardById({ boardId });

  await auditRepo.createAuditLog({
    workspaceId: board.workspaceId,
    entityId: board.id,
    entityTitle: board.title,
    entityType: ENTITY_TYPE.BOARD,
    action: ACTION.DELETE,
    userId,
    userName: member.user.name,
    userImage: member.user.avatar || "",
  });
};

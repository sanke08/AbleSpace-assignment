import * as listRepo from "../repositories/list.repository.js";
import * as memberRepo from "../repositories/member.repository.js";
import * as auditRepo from "../repositories/auditLog.repository.js";
import { AppError } from "../utils/appError.js";
import { Role } from "../prisma/generated/prisma/enums.js";
import { ENTITY_TYPE, ACTION } from "../prisma/generated/prisma/enums.js";
import { CopyListInput } from "../dtos/list.dto.js";

export const copyList = async (userId: string, data: CopyListInput) => {
  const list = await listRepo.findListWithCards(
    data.listId,
    data.boardId,
    data.workspaceId
  );
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember(userId, data.workspaceId);
  if (!member) throw new AppError("Not a member of workspace", 403);

  const newList = await listRepo.createListCopy(
    data.boardId,
    `${list.title} - Copy`,
    list.tasks.map((t) => ({
      title: t.title,
      description: t.description || "",
    }))
  );

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

export const trashList = async (userId: string, listId: string) => {
  const list = await listRepo.findListByIdWithWorkspace(listId);
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember(userId, list.board.workspaceId);
  if (!member || member.role === Role.MEMBER)
    throw new AppError("Not authorized", 403);

  await listRepo.updateListTrash(listId, true);
};

export const restoreList = async (userId: string, listId: string) => {
  const list = await listRepo.findListByIdWithWorkspace(listId);
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember(userId, list.board.workspaceId);
  if (!member || member.role === Role.MEMBER)
    throw new AppError("Not authorized", 403);

  await listRepo.updateListTrash(listId, false);

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

export const deleteList = async (userId: string, listId: string) => {
  const list = await listRepo.findListByIdWithWorkspace(listId);
  if (!list) throw new AppError("List not found", 404);

  const member = await memberRepo.findMember(userId, list.board.workspaceId);
  if (!member || member.role === Role.MEMBER)
    throw new AppError("Not authorized", 403);

  await listRepo.deleteListById(listId);
};

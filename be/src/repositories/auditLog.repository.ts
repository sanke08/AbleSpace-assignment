import { db } from "../utils/db.js";
import { ACTION, ENTITY_TYPE } from "../prisma/generated/prisma/enums.js";

interface CreateLogInput {
  workspaceId: string;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  userId: string;
  userImage: string;
  userName: string;
}

export const createAuditLog = async (data: CreateLogInput) => {
  return await db.auditLog.create({
    data,
  });
};

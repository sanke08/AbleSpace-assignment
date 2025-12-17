import { ACTION, ENTITY_TYPE } from "../prisma/generated/prisma/enums";
import { db } from "../utils/db";

export const addAuditLog = async ({
  workspaceId,
  entityId,
  entityType,
  entityTitle,
  action,
  userId,
  userName,
  userImage,
}: {
  workspaceId: string;
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  userId: string;
  userName: string;
  userImage: string;
}) => {
  db.auditLog
    .create({
      data: {
        workspaceId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId,
        userName,
        userImage,
      },
    })
    .catch((err) => {
      console.log(err);
      // Do further processing
    });
};

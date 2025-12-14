import { db } from "../utils/db.js";
import { Role } from "../prisma/generated/prisma/enums.js";

export const addMember = async (
  workspaceId: string,
  userId: string,
  role: Role = Role.MEMBER
) => {
  return await db.member.create({
    data: {
      workspaceId,
      userId,
      role,
    },
    include: {
      user: true,
    },
  });
};

export const findMember = async (workspaceId: string, userId: string) => {
  return await db.member.findFirst({
    where: {
      workspaceId,
      userId,
    },
    include: {
      user: true,
    },
  });
};

export const findMemberById = async (id: string) => {
  return await db.member.findUnique({
    where: { id },
    include: { user: true },
  });
};

export const updateMemberRole = async (id: string, role: Role) => {
  return await db.member.update({
    where: { id },
    data: { role },
    include: { user: true },
  });
};

export const removeMember = async (id: string) => {
  return await db.member.delete({
    where: { id },
    include: { user: true }, // Return info for logs
  });
};

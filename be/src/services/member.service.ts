import * as memberRepository from "../repositories/member.repository.js";
import * as auditLogRepository from "../repositories/auditLog.repository.js";
import { AppError } from "../utils/appError.js";
import { ACTION, ENTITY_TYPE, Role } from "../prisma/generated/prisma/enums.js";

import * as workspaceRepository from "../repositories/workspace.repository.js";

export const addMember = async (workspaceId: string, userId: string) => {
  // Internal use (from Create Workspace) - no invite check
  const member = await memberRepository.addMember(
    workspaceId,
    userId,
    Role.MEMBER
  );
  return member;
};

export const joinWorkspace = async (
  workspaceId: string,
  userId: string,
  inviteCode: string
) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError("Workspace not found", 404);

  if (workspace.inviteCode !== inviteCode) {
    throw new AppError("Invalid invite code", 400);
  }

  const existing = await memberRepository.findMember(workspaceId, userId);
  if (existing) throw new AppError("Already a member", 400);

  const member = await memberRepository.addMember(
    workspaceId,
    userId,
    Role.MEMBER
  );

  // Log activity
  await auditLogRepository.createAuditLog({
    workspaceId,
    entityId: member.id,
    entityType: ENTITY_TYPE.MEMBER,
    entityTitle: member.user.name,
    action: ACTION.JOINED,
    userId: userId,
    userImage: member.user.avatar || "",
    userName: member.user.name,
  });

  return member;
};

export const removeMember = async (
  actorId: string,
  workspaceId: string,
  targetMemberId: string
) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError("Workspace not found", 404);

  const actor = await memberRepository.findMember(workspaceId, actorId);
  if (!actor || actor.role !== Role.ADMIN) {
    throw new AppError("Not authorized", 403);
  }

  const memberToDelete = await memberRepository.findMemberById(targetMemberId);
  if (!memberToDelete) throw new AppError("Member not found", 404);

  const deletedMember = await memberRepository.removeMember(targetMemberId);

  await auditLogRepository.createAuditLog({
    workspaceId,
    entityId: deletedMember.id,
    entityType: ENTITY_TYPE.MEMBER,
    entityTitle: deletedMember.user.name,
    action: ACTION.REMOVE,
    userId: actorId, // Logged by the admin who removed
    userImage: actor.user.avatar || "",
    userName: actor.user.name,
  });

  return deletedMember;
};
export const updateRole = async (
  actorId: string,
  workspaceId: string,
  targetMemberId: string,
  newRole: Role
) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError("Workspace not found", 404);

  const actor = await memberRepository.findMember(workspaceId, actorId);
  if (!actor || actor.role !== Role.ADMIN)
    throw new AppError("Not authorized", 403);

  const member = await memberRepository.updateMemberRole(
    targetMemberId,
    newRole
  );

  await auditLogRepository.createAuditLog({
    workspaceId,
    entityId: member.id,
    entityType: ENTITY_TYPE.MEMBER,
    entityTitle: member.user.name,
    action: ACTION.ROLE_CHANGED,
    userId: actorId,
    userImage: actor.user.avatar || "",
    userName: actor.user.name,
  });

  return member;
};

export const leaveWorkspace = async (userId: string, workspaceId: string) => {
  const workspace = await workspaceRepository.findWorkspaceById(workspaceId);
  if (!workspace) throw new AppError("Workspace not found", 404);

  const member = await memberRepository.findMember(workspaceId, userId);
  if (!member) throw new AppError("Not member", 404);

  if (workspace.creatorId === member.userId) {
    throw new AppError("Creator cannot leave workspace", 400);
  }

  return await memberRepository.removeMember(member.id);
};

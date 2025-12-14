import { type Request, type Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as memberService from "../services/member.service.js";
import { AppError } from "../utils/appError.js";
import {
  updateMemberRoleSchema,
  joinWorkspaceSchema,
} from "../dtos/workspace.dto.js";

export const join = catchAsync(async (req: Request, res: Response) => {
  const validation = joinWorkspaceSchema.safeParse(req.body);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }

  const workspaceId = req.params.workspaceId as string;
  const member = await memberService.joinWorkspace(
    workspaceId,
    req.user.id,
    validation.data.inviteCode
  );
  res.status(201).json({ status: "success", data: member });
});

export const leave = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId as string;
  await memberService.leaveWorkspace(req.user.id, workspaceId);
  res.status(204).json({ status: "success", data: null });
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId as string;
  const memberId = req.params.memberId as string;
  await memberService.removeMember(req.user.id, workspaceId, memberId);
  res.status(204).json({ status: "success", data: null });
});

export const updateRole = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId as string;
  const memberId = req.params.memberId as string;

  const validation = updateMemberRoleSchema.safeParse(req.body);
  if (!validation.success) {
    const message =
      validation.error?.issues[0]?.message || "updating Role Validation error";

    throw new AppError(message, 400);
  }

  const member = await memberService.updateRole(
    req.user.id,
    workspaceId,
    memberId,
    validation.data.role
  );
  res.status(200).json({ status: "success", data: member });
});

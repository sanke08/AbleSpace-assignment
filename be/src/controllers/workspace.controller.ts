import { type Request, type Response, type NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as workspaceService from "../services/workspace.service.js";
import {
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "../dtos/workspace.dto.js";
import { AppError } from "../utils/appError.js";

export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const validation = createWorkspaceSchema.safeParse(req.body);
    if (!validation.success) {
      const message =
        validation.error?.issues[0]?.message ||
        "Creating workspace failed Validation error";
      throw new AppError(message, 400);
    }

    const user = req.user as any;
    const workspace = await workspaceService.createWorkspace(
      user.id,
      validation.data
    );
    res.status(201).json({ status: "success", data: workspace });
  }
);

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const workspaces = await workspaceService.getMyWorkspaces(req.user.id);
  res.status(200).json({ status: "success", data: workspaces });
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const validation = updateWorkspaceSchema.safeParse(req.body);
  if (!validation.success) {
    const message =
      validation.error?.issues[0]?.message ||
      "Updating workspace failed Validation error";
    throw new AppError(message, 400);
  }

  const workspace = await workspaceService.updateWorkspace(
    req.params.id as string,
    req.user.id,
    validation.data
  );
  res.status(200).json({ status: "success", data: workspace });
});

export const deleteWs = catchAsync(async (req: Request, res: Response) => {
  await workspaceService.deleteWorkspace(req.params.id as string, req.user.id);
  res.status(204).json({ status: "success", data: null });
});

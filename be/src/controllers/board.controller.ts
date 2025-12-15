import { catchAsync } from "../utils/catchAsync.js";
import * as boardService from "../services/board.service.js";
import * as workspaceService from "../services/workspace.service.js";
import {
  createBoardSchema,
  updateBoardSchema,
  boardIdSchema,
} from "../dtos/board.dto.js";
import { AppError } from "../utils/appError.js";

export const getBoards = catchAsync(async (req, res) => {
  const { workspaceId } = req.params as { workspaceId: string };
  if (!workspaceId) throw new AppError("Workspace ID is required", 400);
  const workspace = await workspaceService.getWorkspaceById({
    userId: req.user.id,
    workspaceId,
  });
  if (!workspace) throw new AppError("Workspace not found", 404);
  const boards = await boardService.getBoardsByWorkspaceId({
    workspaceId: workspace.id,
  });
  res.status(200).json({ status: "success", data: boards });
});

export const createBoard = catchAsync(async (req, res) => {
  const validation = createBoardSchema.safeParse(req.body);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }
  const board = await boardService.createBoard({
    userId: req.user.id,
    ...validation.data,
  });
  res.status(201).json({ status: "success", data: board });
});

export const updateBoard = catchAsync(async (req, res) => {
  const validation = updateBoardSchema.safeParse(req.body);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }
  const board = await boardService.updateBoardService({
    userId: req.user.id,
    ...validation.data,
  });
  res.status(200).json({ status: "success", data: board });
});

export const trashBoard = catchAsync(async (req, res) => {
  const validation = boardIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }
  await boardService.trashBoard({ userId: req.user.id, ...validation.data });
  res.status(200).json({ status: "success" });
});

export const restoreBoard = catchAsync(async (req, res) => {
  const validation = boardIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }
  await boardService.restoreBoard({ userId: req.user.id, ...validation.data });
  res.status(200).json({ status: "success" });
});

export const deleteBoard = catchAsync(async (req, res) => {
  const validation = boardIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }
  await boardService.deleteBoardService({
    userId: req.user.id,
    ...validation.data,
  });
  res.status(204).send();
});

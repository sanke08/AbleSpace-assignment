import { catchAsync } from "../utils/catchAsync.js";
import * as listService from "../services/list.service.js";
import { copyListSchema, listIdSchema } from "../dtos/list.dto.js";
import { AppError } from "../utils/appError.js";

export const copy = catchAsync(async (req, res) => {
  const validation = copyListSchema.safeParse(req.body);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }

  const list = await listService.copyList({
    userId: req.user.id,
    data: validation.data,
  });
  res.status(201).json({ status: "success", data: list });
});

export const trash = catchAsync(async (req, res) => {
  const validation = listIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }

  await listService.trashList({
    userId: req.user.id,
    listId: validation.data.listId,
  });
  res.status(200).json({ status: "success" });
});

export const restore = catchAsync(async (req, res) => {
  const validation = listIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }

  await listService.restoreList({
    userId: req.user.id,
    listId: validation.data.listId,
  });
  res.status(200).json({ status: "success" });
});

export const remove = catchAsync(async (req, res) => {
  const validation = listIdSchema.safeParse(req.params);
  if (!validation.success) {
    const message = validation.error?.issues[0]?.message || "Validation error";
    throw new AppError(message, 400);
  }

  await listService.deleteList({
    userId: req.user.id,
    listId: validation.data.listId,
  });
  res.status(204).send();
});

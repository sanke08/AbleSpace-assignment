import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import * as taskService from "../services/task.service.js";
import { AppError } from "../utils/appError.js";

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;
  const { listId, boardId } = req.params;

  if (!title || !listId || !boardId)
    throw new AppError("Title, listId, and boardId are required", 400);

  const task = await taskService.createTask({
    title,
    listId,
    boardId,
    userId: req.user.id,
  });

  res.status(201).json({ status: "success", data: task });
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { description } = req.body;
  const { taskId, boardId } = req.params;

  if (!taskId || !boardId)
    throw new AppError("TaskId, boardId are required", 400);

  const task = await taskService.updateTask({
    taskId,
    boardId,
    description,
    userId: req.user.id,
  });

  res.status(200).json({ status: "success", data: task });
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { taskId, boardId } = req.params;

  if (!taskId || !boardId)
    throw new AppError("TaskId, boardId are required", 400);

  await taskService.deleteTask({
    taskId,
    boardId,
    userId: req.user.id,
  });

  res.status(204).send();
});

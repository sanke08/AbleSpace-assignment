import { api } from "@/lib/axios";
import type { CreateTaskInput } from "../schema/task.schema";

export const createTask = async ({
  boardId,
  listId,
  title,
  workspaceId,
}: CreateTaskInput & {
  boardId: string;
  listId: string;
  workspaceId: string;
}) => {
  const { data } = await api.post(
    `/workspaces/${workspaceId}/boards/${boardId}/lists/${listId}/tasks`,
    { title }
  );
  return data;
};

export const updateTask = async ({
  taskId,
  description,
  boardId,
  listId,
  workspaceId,
}: {
  taskId: string;
  description: string;
  boardId: string;
  listId: string;
  workspaceId: string;
}) => {
  const { data } = await api.put(
    `/workspaces/${workspaceId}/boards/${boardId}/lists/${listId}/tasks/${taskId}`,
    { description }
  );
  return data;
};

export const trashTask = async ({
  taskId,
  boardId,
  listId,
  workspaceId,
}: {
  taskId: string;
  boardId: string;
  listId: string;
  workspaceId: string;
}) => {
  const { data } = await api.patch(
    `/workspaces/${workspaceId}/boards/${boardId}/lists/${listId}/tasks/${taskId}`
  );
  return data;
};

import { api } from "@/lib/axios";
import type { CreateTaskInput } from "../schema/task.schema";

export const createTask = async (payload: CreateTaskInput) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

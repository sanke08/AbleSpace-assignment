import { api } from "@/lib/axios";
import type { Task } from "@/lib/types";

export const getMyTasks = async (): Promise<Task[]> => {
  const { data } = await api.get(`/workspaces/random/tasks`);
  console.log(data);
  return data.data;
};

import { api } from "@/lib/axios";
import type { CreateWorkspaceInput } from "../schemas/workspace.schema";

export const createWorkspace = async (payload: CreateWorkspaceInput) => {
  const { data } = await api.post("/workspaces", payload);
  return data;
};

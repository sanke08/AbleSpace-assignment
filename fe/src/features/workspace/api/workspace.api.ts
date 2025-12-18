import { api } from "@/lib/axios";
import type { CreateWorkspaceInput } from "../schemas/workspace.schema";
import type { Workspace } from "@/lib/types";

export const createWorkspace = async (payload: CreateWorkspaceInput) => {
  const { data } = await api.post("/workspaces", payload);
  return data;
};

interface UpdateWorkspaceParams {
  workspaceId: string;
  title: string;
  description?: string;
}

interface GenerateInviteLinkParams {
  workspaceId: string;
}

interface DeleteWorkspaceParams {
  workspaceId: string;
}

interface LeaveWorkspaceParams {
  workspaceId: string;
}

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: string;
}): Promise<Workspace> => {
  const { data } = await api.get(`/workspaces/${workspaceId}`);
  console.log(data);
  return data.data;
};

export const updateWorkspace = async ({
  workspaceId,
  ...updateData
}: UpdateWorkspaceParams): Promise<Workspace> => {
  const { data } = await api.patch(
    `/api/v1/workspaces/${workspaceId}`,
    updateData
  );
  return data;
};

export const generateInviteLink = async ({
  workspaceId,
}: GenerateInviteLinkParams): Promise<Workspace> => {
  const { data } = await api.post(
    `/api/v1/workspaces/${workspaceId}/generate-invite`
  );
  return data;
};

export const deleteWorkspace = async ({
  workspaceId,
}: DeleteWorkspaceParams): Promise<void> => {
  await api.delete(`/api/v1/workspaces/${workspaceId}`);
};

export const leaveWorkspace = async ({
  workspaceId,
}: LeaveWorkspaceParams): Promise<void> => {
  await api.post(`/api/v1/workspaces/${workspaceId}/leave`);
};

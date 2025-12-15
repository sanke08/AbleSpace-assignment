import { api } from "@/lib/axios";

export const fetchWorkspaceBoards = async (workspaceId: string) => {
  const { data } = await api.get(`/workspaces/${workspaceId}/boards`);
  return data.data;
};

export const createBoardApi = async ({
  title,
  workspaceId,
}: {
  title: string;
  workspaceId: string;
}) => {
  const { data } = await api.post(`/workspaces/${workspaceId}/boards`, {
    title,
  });
  return data;
};

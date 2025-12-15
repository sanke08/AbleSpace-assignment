import { api } from "@/lib/axios";
import type { Board } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export type WorkspaceBoardsResponse = {
  id: string;
  name: string;
  boards: Board[];
};

export const useWorkspaceBoards = (workspaceId?: string) => {
  return useQuery<WorkspaceBoardsResponse>({
    queryKey: ["workspace-boards", workspaceId],
    enabled: !!workspaceId, // 🚨 IMPORTANT
    queryFn: async () => {
      const { data } = await api.get(`/workspaces/${workspaceId}/boards`);
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

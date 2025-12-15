import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

export const useWorkspaceMembers = () => {
  return useQuery({
    queryKey: ["workspace-members"],
    queryFn: async () => {
      const { data } = await api.get("/workspaces");
      return data.data;
    },
  });
};

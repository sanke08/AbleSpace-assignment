// features/organization/hooks/useCreateOrganization.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../api/workspace.api";

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};

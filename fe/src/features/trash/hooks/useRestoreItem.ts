import { useMutation } from "@tanstack/react-query";
import { restoreItem } from "../api/trash.api";
import { queryClient } from "@/lib/queryClient";

export const useRestoreItem = () => {
  return useMutation({
    mutationFn: restoreItem,
    onSuccess: (_, variables) => {
      // Refresh trash list
      console.log("variables", variables);
      queryClient.invalidateQueries({
        queryKey: ["trashed-items", variables.workspaceId],
      });

      // Refresh workspace data that may depend on this
      queryClient.invalidateQueries({
        queryKey: ["workspace-boards", variables.workspaceId],
      });
    },
  });
};

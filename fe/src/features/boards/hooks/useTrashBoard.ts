import { useMutation, useQueryClient } from "@tanstack/react-query";
import { trashBoard } from "../api/boards.api";

export const useTrashBoard = ({
  boardId,
  workspaceId,
}: {
  boardId: string;
  workspaceId: string;
}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => trashBoard({ boardId, workspaceId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["boards", workspaceId] });
    },
  });
};

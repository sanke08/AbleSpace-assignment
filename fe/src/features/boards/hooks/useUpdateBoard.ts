import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoard } from "../api/boards.api";

export const useUpdateBoard = ({
  boardId,
  workspaceId,
}: {
  boardId: string;
  workspaceId: string;
}) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string }) =>
      updateBoard(boardId, workspaceId, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["board", boardId] });
    },
  });
};

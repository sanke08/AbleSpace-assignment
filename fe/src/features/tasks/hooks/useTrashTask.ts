import { useMutation } from "@tanstack/react-query";
import { trashTask } from "../api/task.api";

export const useTrashTask = () => {
  return useMutation({
    mutationFn: trashTask,
  });
};

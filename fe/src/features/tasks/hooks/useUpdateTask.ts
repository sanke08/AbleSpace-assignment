import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../api/task.api";

export const useUpdateTask = () => {
  return useMutation({
    mutationFn: updateTask,
  });
};

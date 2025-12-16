import { useMutation } from "@tanstack/react-query";
import { createTask } from "../api/task.api";

export const useAddTask = () => {
  return useMutation({
    mutationFn: createTask,
  });
};

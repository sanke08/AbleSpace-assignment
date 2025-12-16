import { useMutation } from "@tanstack/react-query";
import { updateList } from "../api/list.api";

export const useUpdateList = () => {
  return useMutation({
    mutationFn: updateList,
  });
};

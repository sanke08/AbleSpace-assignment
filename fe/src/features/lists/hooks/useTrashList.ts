import { useMutation } from "@tanstack/react-query";
import { trashList } from "../api/list.api";

export const useTrashList = () => {
  return useMutation({
    mutationFn: trashList,
  });
};

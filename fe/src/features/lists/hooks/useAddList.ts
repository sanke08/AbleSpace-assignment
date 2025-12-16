import { useMutation } from "@tanstack/react-query";
import { createList } from "../api/list.api";

export const useAddList = () => {
  return useMutation({
    mutationFn: createList,
  });
};

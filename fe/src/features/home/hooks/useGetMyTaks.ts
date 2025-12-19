import { useQuery } from "@tanstack/react-query";
import { getMyTasks } from "../api/home.api";

export const useGetMyTasks = () => {
  return useQuery({
    queryKey: ["my-tasks"],
    queryFn: () => getMyTasks(),
  });
};

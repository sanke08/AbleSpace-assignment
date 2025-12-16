import { useSocket } from "@/app/providers/SocketProvider";
import type { Task } from "@/lib/types";
import { useEffect } from "react";

export const useTaskSocket = ({
  listId,
  onCreate,
  onUpdate,
  onDelete,
}: {
  listId: string;
  onCreate: (task: Task) => void;
  onUpdate: (task: Task) => void;
  onDelete: (task: Task) => void;
}) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on(`task:create:${listId}`, onCreate);
    socket.on(`task:update:${listId}`, onUpdate);
    socket.on(`task:delete:${listId}`, onDelete);

    return () => {
      socket.off(`task:create:${listId}`, onCreate);
      socket.off(`task:update:${listId}`, onUpdate);
      socket.off(`task:delete:${listId}`, onDelete);
    };
  }, [socket, listId, onCreate, onUpdate, onDelete]);
};

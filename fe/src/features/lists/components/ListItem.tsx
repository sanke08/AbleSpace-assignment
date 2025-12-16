import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "react-router-dom";

import type { List } from "@/lib/types";
import { useTaskSocket } from "@/features/tasks/hooks/useTaskSocket";
import AddTask from "@/features/tasks/components/AddTask";
import ListHeader from "./ListHeader";
import TaskCard from "@/features/tasks/components/TaskCard";

type Props = {
  list: List;
  workspaceId: string;
};

const ListItem = ({ list, workspaceId }: Props) => {
  const [tasks, setTasks] = useState(list.tasks || []);
  const [searchParams] = useSearchParams();

  useTaskSocket({
    listId: list.id,
    onCreate: (task) => {
      console.log(task);
      setTasks((prev) => [...prev, task]);
    },
    onUpdate: (task) =>
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t))),
    onDelete: (task) =>
      setTasks((prev) => prev.filter((t) => t.id !== task.id)),
  });

  const isHovered = searchParams.get("hover") === list.id;

  return (
    <li
      className={twMerge(
        "bg-neutral-100 p-2 min-w-[250px] rounded-md h-fit border",
        isHovered && "bg-sky-200/80"
      )}
    >
      <ListHeader list={list} workspaceId={workspaceId} />

      <ol className="flex flex-col space-y-2 mt-2">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.id}
            task={task}
            index={index}
            boardId={list.boardId}
            workspaceId={workspaceId}
          />
        ))}
      </ol>

      <AddTask
        listId={list.id}
        boardId={list.boardId}
        workspaceId={workspaceId}
      />
    </li>
  );
};

export default ListItem;

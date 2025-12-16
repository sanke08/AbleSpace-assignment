import { useSearchParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import TaskDetail from "./TaskDetail";

type Props = {
  task: Task;
  index: number;

  boardId: string;
  workspaceId: string;
};

const TaskCard = ({ task, boardId, workspaceId }: Props) => {
  const [searchParams] = useSearchParams();
  const isHovered = searchParams.get("hover") === task.id;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "w-full p-2 px-4 rounded-lg shadow shadow-neutral-500/10 border bg-white cursor-pointer hover:border-black",
            isHovered && "bg-sky-200/80"
          )}
        >
          {task.title}
        </div>
      </DialogTrigger>

      <DialogContent className="w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%]">
        <DialogHeader>
          <DialogTitle>Task Detail</DialogTitle>
        </DialogHeader>

        <TaskDetail task={task} boardId={boardId} workspaceId={workspaceId} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskCard;

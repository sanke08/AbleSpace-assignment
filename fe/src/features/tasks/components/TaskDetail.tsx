import { Loader2, Workflow } from "lucide-react";

import { useGetTask } from "../hooks/useGetTask";
import TaskHeader from "./TaskHeader";
import TaskDescription from "./TaskDescription";
import TaskProperties from "./TaskProperties";
import TaskActivity from "./TaskActivity";

const TaskDetail = ({
  taskId,
  boardId,
  workspaceId,
  listId,
}: {
  taskId: string;
  boardId: string;
  workspaceId: string;
  listId: string;
}) => {
  const { data: task, isLoading } = useGetTask({
    taskId,
    boardId,
    workspaceId,
    listId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-neutral-500">
        <Workflow className="w-12 h-12 mb-2" />
        <p className="text-lg">Task not found</p>
      </div>
    );
  }

  return (
    <div className=" p-6 space-y-6 w-max">
      <TaskHeader
        task={task}
        boardId={boardId}
        workspaceId={workspaceId}
        listId={listId}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-2 space-y-6">
          <TaskDescription
            task={task}
            boardId={boardId}
            workspaceId={workspaceId}
            listId={listId}
          />

          <TaskActivity taskId={task.id} />
        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-1">
          <TaskProperties
            task={task}
            boardId={boardId}
            workspaceId={workspaceId}
            listId={listId}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;

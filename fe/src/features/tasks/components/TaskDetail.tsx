import { Check, Loader2, Menu, Trash, Workflow } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Task } from "@/lib/types";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useTrashTask } from "../hooks/useTrashTask";
import { updateTaskSchema, type UpdateTaskInput } from "../schema/task.schema";

const TaskDetail = ({
  task,
  boardId,
  workspaceId,
}: {
  task: Task;
  boardId: string;
  workspaceId: string;
}) => {
  const {
    mutateAsync: updateTask,
    isPending: updating,
    isSuccess: updateSuccess,
    error: updateError,
  } = useUpdateTask();

  const {
    mutateAsync: trashTask,
    isPending: deleting,
    error: deleteError,
  } = useTrashTask();

  const form = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      description: task.description || "",
    },
  });

  const onSubmit = async (values: UpdateTaskInput) => {
    await updateTask({
      description: values.description || "",
      boardId,
      listId: task.listId,
      taskId: task.id,
      workspaceId,
    });
  };

  const handleDelete = async () => {
    await trashTask({
      boardId,
      listId: task.listId,
      taskId: task.id,
      workspaceId,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Workflow />
        <h2 className="text-2xl font-semibold">{task.title}</h2>
      </div>

      {/* Description */}
      <div className="flex items-center gap-2 mt-4">
        <Menu />
        <p className="text-lg font-medium">Description</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="sm:flex gap-4 mt-2">
          <div className="w-full">
            <Textarea
              {...form.register("description")}
              placeholder="Add details about this task"
              className="bg-neutral-100 max-h-[20rem]"
            />

            {/* {updateError && <ErrorField errorStr={updateError as any} />} */}
            {/* {updateSuccess && <SuccessField successStr="Task updated" />} */}
          </div>

          {/* Actions */}
          <div className="flex sm:flex-col gap-2 justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-full p-2"
            >
              {deleting ? <Loader2 className="animate-spin" /> : <Trash />}
            </Button>

            <Button
              type="submit"
              variant="ghost"
              disabled={updating}
              className="rounded-full bg-green-500 p-2"
            >
              {updating ? <Loader2 className="animate-spin" /> : <Check />}
            </Button>
          </div>
        </div>
      </form>

      {/* {deleteError && <ErrorField errorStr={deleteError as any} />} */}
    </div>
  );
};

export default TaskDetail;

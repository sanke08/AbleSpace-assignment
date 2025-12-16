// import { useRef, useState } from "react";
// import { Plus, X } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useOnClickOutside } from "usehooks-ts";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { useAddTask } from "../hooks/useAddTask";
// import { createTaskSchema, type CreateTaskInput } from "../schema/task.schema";
// import { cn } from "@/lib/utils";

// const AddTask = ({ listId }: { listId: string }) => {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [open, setOpen] = useState(false);

//   const { mutateAsync, isPending } = useAddTask();

//   const form = useForm<CreateTaskInput>({
//     resolver: zodResolver(createTaskSchema),
//     defaultValues: {
//       title: "",
//       listId,
//     },
//   });

//   useOnClickOutside(ref, () => setOpen(false));

//   const onSubmit = async (values: CreateTaskInput) => {
//     await mutateAsync(values);
//     form.reset();
//     setOpen(false);
//   };

//   return (
//     <div ref={ref} className="w-full">
//       <Button
//         variant="ghost"
//         onClick={() => setOpen(true)}
//         className={cn("w-full justify-start gap-2 border-t", open && "hidden")}
//       >
//         <Plus size={16} />
//         Add a task
//       </Button>

//       {open && (
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 mt-2">
//           <Textarea
//             placeholder="Enter task title"
//             {...form.register("title")}
//           />

//           <div className="flex gap-2">
//             <Button
//               type="submit"
//               isLoading={isPending}
//               disabled={!form.watch("title")}
//             >
//               Add task
//             </Button>
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={() => setOpen(false)}
//             >
//               <X />
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AddTask;

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAddTask } from "../hooks/useAddTask";
import { createTaskSchema, type CreateTaskInput } from "../schema/task.schema";

const AddTask = ({
  listId,
  boardId,
  workspaceId,
}: {
  listId: string;
  boardId: string;
  workspaceId: string;
}) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useAddTask();

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: CreateTaskInput) => {
    try {
      await mutateAsync({ boardId, listId, workspaceId, title: values.title });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 border-t"
          >
            <Plus size={16} />
            Add a task
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[280px] p-3" align="start" side="bottom">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <Textarea
              placeholder="Enter task title"
              {...form.register("title")}
              autoFocus
              rows={3}
            />

            {form.formState.errors.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                isLoading={isPending}
                disabled={!form.watch("title") || isPending}
                size="sm"
              >
                Add task
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddTask;

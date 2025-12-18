import { useWorkspace } from "@/app/context/SettingsContext";
import MemberCard from "../components/MemberCard";

const Members = () => {
  const workspace = useWorkspace();
  console.log({ workspace });

  return (
    <div className="p-5 border border-neutral-900/20 rounded-lg h-full w-full mx-auto lg:w-full mt-2">
      <div className="text-4xl font-semibold">Members</div>
      <p className="text-neutral-900/50">View and manage workspace members</p>

      <div className="mt-5 w-full flex flex-col">
        {/* Table Header */}
        <div className="flex w-full border-b pb-1 font-semibold">
          <div className="w-[55%] md:w-[50%]">User</div>
          <div className="w-[30%] md:w-[20%]">Role</div>
          <div className="w-[15%] hidden md:block">Joined</div>
          <div className="w-[10%]">Action</div>
        </div>

        {/* Members List */}
        <div className="space-y-2">
          {workspace?.members && workspace.members.length > 0 ? (
            workspace?.members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                workspace={workspace}
              />
            ))
          ) : (
            <div className="text-center py-10 text-neutral-500">
              No members found
            </div>
          )}
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex items-center justify-between mt-5 pt-5 border-t">
            <p className="text-sm text-neutral-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page - 1)}
                disabled={!canGoPrevious}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(page + 1)}
                disabled={!canGoNext}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Members;

import { Accordion } from "@/components/ui/accordion";
import NavItem from "./NavItem.tsx";
import type { Workspace, User } from "@/lib/types";
import AddWorkspace from "@/features/workspace/components/AddWorkspace.tsx";

interface Props {
  workspaces: Array<Workspace>;
  user: User;
}

const Sidebar = ({ workspaces, user }: Props) => {
  if (!workspaces || workspaces.length === 0) return null;

  return (
    <div className="w-full overflow-y-auto hidescrollbar h-[calc(100vh-5rem)]">
      <AddWorkspace />
      <Accordion type="multiple" className="">
        {workspaces?.map((workspace) => (
          <NavItem key={workspace.id} workspace={workspace} user={user} />
        ))}
      </Accordion>
      <div className="h-400 p-3 bg-red-400/50"></div>
    </div>
  );
};

export default Sidebar;

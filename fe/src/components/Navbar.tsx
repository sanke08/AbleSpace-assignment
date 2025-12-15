import { Button } from "@/components/ui/button";
import type { User, Workspace } from "@/lib/types";
import { Plus } from "lucide-react";
// import OrgnizationSwitcher from "./OrgnizationSwitcher";
// import MobileSidebar from "./MobileSidebar";

interface Props {
  workspaces: Workspace[];
  user: User;
}

export const Navbar = ({}: Props) => {
  return (
    <div className="fixed top-0 left-0 border-b  bg-white shadow-md w-full px-5">
      <div className="px-20 h-14 flex items-center justify-between">
        <div className="gap-3 items-center hidden md:flex">
          <div className="font-semibold">Taskify</div>
          <Button>Create</Button>
        </div>

        <div className="flex gap-2 items-center md:hidden z-50">
          {/* <MobileSidebar members={members} user={user} /> */}
          <Button className="w-fit h-fit p-1 px-2" size="sm">
            <Plus />
          </Button>
        </div>

        {/* <OrgnizationSwitcher members={members} user={user} /> */}
      </div>
    </div>
  );
};

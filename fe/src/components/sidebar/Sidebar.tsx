import { Accordion } from "@/components/ui/accordion";
import NavItem from "./NavItem.tsx";
import type { Workspace, User } from "@/lib/types";

interface Props {
  workspaces: Array<Workspace>;
  user: User;
}

const Sidebar = ({ workspaces, user }: Props) => {
  // const { workspaceId } = useParams<{ workspaceId: string }>();

  if (!workspaces || workspaces.length === 0) return null;

  // const currWorkspace = workspaces.find(
  //   (workspace) => workspace.id === workspaceId
  // );

  // const isCreator = members[0].workspace?.creatorId === members[0].userId;

  return (
    <div className="w-72 h-fit sticky top-16">
      <Accordion type="multiple" className="">
        {workspaces?.map((workspace) => (
          <NavItem key={workspace.id} workspace={workspace} user={user} />
        ))}
      </Accordion>

      <div className="fixed bottom-0 space-y-2 w-[300px] bg-slate-200 sm:w-[250px] left-0 p-3">
        {/* <UserButton user={user} /> */}

        {/* {isCreator && currOrg && (
          <CustomDialogTrigger
            header="Leave Organization"
            className="lg:w-[40%] w-[90%] md:h-[20em] min-h-[18em]"
            content={<LeaveOrg currOrg={currOrg} member={members[0]} />}
          >
            <Button variant="outline" className="flex gap-2 w-full h-fit p-1.5">
              Leave Organization
              <LogOut />
            </Button>
          </CustomDialogTrigger>
        )} */}
      </div>
    </div>
  );
};

export default Sidebar;

import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import useAuthUser from "@/features/auth/hooks/useAuthUser";
import { useWorkspaceMembers } from "@/features/workspace/hooks/useWorkspaceMembers";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import type { User } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";
import SocketProvider from "../providers/SocketProvider";

export default function WorkspaceLayout() {
  const { user, isLoading: userLoading } = useAuthUser();

  const { data: workspaces, isLoading: workspacesLoading } =
    useWorkspaceMembers();

  if (userLoading || workspacesLoading) {
    return <Loader className="animate-spin" />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to first workspace if at root path
  // if (location.pathname === "/" && workspaces && workspaces.length > 0) {
  //   return <Navigate to={`/${workspaces[0].id}`} replace />;
  // }

  return (
    <SocketProvider>
      <div className="px-24">
        <Toaster />
        <Navbar workspaces={workspaces} user={user as User} />
        <div className="pt-14 mt-4 flex gap-10">
          <div className=" min-w-60 max-w-60 w-60 sticky top-18 self-start border-r border-neutral-300 pr-2">
            <Sidebar workspaces={workspaces} user={user as User} />
          </div>
          <div className="mt-2 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}

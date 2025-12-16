// workspace/WorkspaceLayout.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import useAuthUser from "@/features/auth/hooks/useAuthUser";
import { useWorkspaceMembers } from "@/features/workspace/hooks/useWorkspaceMembers";
import { Navbar } from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import type { User } from "@/lib/types";
import { Toaster } from "@/components/ui/sonner";

export default function WorkspaceLayout() {
  const { user, isLoading: userLoading } = useAuthUser();

  const { data: workspaces, isLoading: workspacesLoading } =
    useWorkspaceMembers();

  const location = useLocation();

  if (userLoading || workspacesLoading) {
    return <Loader className="animate-spin" />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to first workspace if at root path
  if (location.pathname === "/" && workspaces && workspaces.length > 0) {
    return <Navigate to={`/${workspaces[0].id}`} replace />;
  }

  return (
    <div className="min-h-screen px-24">
      <Toaster />
      <Navbar workspaces={workspaces} user={user as User} />
      <div className="pt-14 mt-2 flex gap-10">
        <div className=" min-w-60 max-w-60 w-60 sticky top-16 self-start">
          <Sidebar workspaces={workspaces} user={user as User} />
        </div>
        <div className="mt-2 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

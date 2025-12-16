"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Workspace, User } from "@/lib/types";
import {
  Activity,
  Building,
  Layout,
  Settings,
  ShieldCheck,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {
  workspace: Workspace;
  user: User;
};

const NavItem = ({ workspace, user }: Props) => {
  const disabled = workspace.creatorId !== user.id;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [toggle, setToggle] = useState<boolean>(false);

  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/${workspace.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/${workspace.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/${workspace.id}/settings`,
    },
    {
      label: "Trash",
      icon: <Trash className="h-4 w-4 mr-2" />,
      href: `/${workspace.id}/trash`,
    },
  ];

  return (
    <AccordionItem value={workspace.id} className="space-y-1">
      <AccordionTrigger
        onClick={() => setToggle((pre) => !pre)}
        className={twMerge(
          "border border-neutral-300 hover:no-underline p-2 px-4 rounded-md",
          params?.workspaceId === workspace.id && "bg-sky-200/50",
          toggle && params?.workspaceId === workspace.id && "bg-white"
        )}
      >
        <div className="flex items-center justify-between gap-x-2 w-full">
          <div className="w-full flex gap-2 items-center">
            <Building />
            <span className="font-medium text-sm">{workspace.name}</span>
          </div>
          {workspace.creatorId === user.id && (
            <ShieldCheck className="h-5 w-5 text-green-500" />
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {routes.map((route) => (
          <Button
            disabled={route.label === "Settings" && disabled}
            key={route.label}
            size="sm"
            variant="ghost"
            onClick={() => {
              navigate(route.href);
            }}
            className={twMerge(
              "w-full font-normal justify-start pl-10 hover:bg-sky-500/10",
              (location.pathname === route.href ||
                (params?.boardId && route.label === "Boards")) &&
                "bg-sky-500/10 text-sky-700 my-[2px]"
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;

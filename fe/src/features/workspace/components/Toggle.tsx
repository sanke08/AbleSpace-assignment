// src/features/workspaces/components/settings/Toggle.tsx
import React, { useEffect, useState } from "react";
import { Check, Copy, RefreshCcw, Settings, Share, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usegenerateInvideCode } from "@/features/workspace/hooks/usegenerateInvideCode";
import type { Workspace } from "@/lib/types";
import WorkspaceInfo from "./WorkspaceInfo";
import { cn } from "@/lib/utils";

interface ToggleProps {
  workspace: Workspace;
}

type SettingsView = "members" | "settings";

const Toggle: React.FC<ToggleProps> = ({ workspace }) => {
  const [activeView, setActiveView] = useState<SettingsView>("settings");
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const inviteUrl = `${origin}/invite/${workspace.inviteCode}`;

  // const { mutate: generateLink, isLoading: isGenerating } =
  //   useGenerateInviteLink();

  useEffect(() => {
    // Set default view on mount
    setActiveView("settings");
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleGenerateLink = () => {
    // generateLink({ workspaceId: workspace.id });
  };

  return (
    <div className="w-full mx-auto border border-neutral-400/50 rounded-lg p-5 py-10 h-full">
      <WorkspaceInfo workspace={workspace} />

      <div className="flex flex-col gap-3 mt-10">
        <Button
          onClick={() => setActiveView("members")}
          variant="ghost"
          className={cn(
            "bg-slate-200 hover:bg-slate-200/50 space-x-3 justify-start",
            activeView === "members" && "bg-sky-500/20 hover:bg-sky-500/20"
          )}
        >
          <User />
          <p>Members</p>
        </Button>

        <Button
          onClick={() => setActiveView("settings")}
          variant="ghost"
          className={cn(
            "bg-slate-200 hover:bg-slate-200/50 space-x-3 justify-start",
            activeView === "settings" && "bg-sky-500/20 hover:bg-sky-500/20"
          )}
        >
          <Settings />
          <p>Settings</p>
        </Button>

        <div className="bg-slate-200 p-1 h-full transition-all duration-500">
          <div className="flex items-center gap-2">
            <Share className="ml-2" />
            <Input readOnly value={inviteUrl} className="flex-1" />
            <Button
              // disabled={isGenerating}
              onClick={handleCopy}
              variant="ghost"
              className="rounded-full h-fit w-fit p-1 relative"
            >
              <Copy
                className={cn(
                  "h-5 w-5 transition-all duration-300 absolute",
                  copied && "scale-0"
                )}
              />
              <Check
                className={cn(
                  "h-5 w-5 transition-all duration-300 bg-green-500 rounded-full",
                  !copied && "scale-0"
                )}
              />
            </Button>
            <Button
              onClick={handleGenerateLink}
              // disabled={isGenerating}
              variant="ghost"
              className="rounded-full h-fit w-fit p-1"
            >
              <RefreshCcw className={cn(false && "animate-spin")} />
            </Button>
          </div>
          {false && (
            <p className="text-end text-xs animate-pulse mt-1">
              generating link
            </p>
          )}
          {copied && (
            <p className="text-green-500 text-xs text-end mt-1">copied</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toggle;

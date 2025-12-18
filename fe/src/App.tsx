import { Routes, Route } from "react-router-dom";
import AuthPage from "@/features/auth/pages/AuthPage";
import WorkspaceLayout from "./app/layout/WorkspaceLayout";
import WorkspacePage from "./features/workspace/pages/WorkspacePage";
import BoardPage from "./features/boards/pages/BoardPage";
import SettingsLayout from "./app/layout/SettingsLayout";
import Settings from "./features/settings/pages/SettingsPage";
import Members from "./features/members/pages/Members";
import AuditLogPage from "./features/audits/pages/AuditLogPage";
import TrashPage from "./features/trash/pages/TrashPage";
import HomePage from "./features/home/pages/HomePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkspaceLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:workspaceId" element={<WorkspacePage />} />
        <Route path="/:workspaceId" element={<SettingsLayout />}>
          <Route path="settings" element={<Settings />} />
          <Route path="members" element={<Members />} />
        </Route>
        <Route path="/:workspaceId/boards/:boardId" element={<BoardPage />} />
        <Route path="/:workspaceId/audits" element={<AuditLogPage />} />
        <Route path="/:workspaceId/trash" element={<TrashPage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;

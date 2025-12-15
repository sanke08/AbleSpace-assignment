import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "@/features/auth/pages/AuthPage";
import WorkspaceLayout from "./app/layout/WorkspaceLayout";
import WorkspacePage from "./features/workspace/pages/WorkspacePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkspaceLayout />}>
        <Route path="/:workspaceId" element={<WorkspacePage />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import AuthPage from "@/features/auth/pages/AuthPage";
import WorkspaceLayout from "./app/layout/WorkspaceLayout";
import WorkspacePage from "./features/workspace/pages/WorkspacePage";
import BoardPage from "./features/boards/pages/BoardPage";

const App = () => {
  return (
    <Routes>
      <Route path="/:workspaceId" element={<WorkspaceLayout />}>
        <Route index element={<WorkspacePage />} />
        <Route path="boards/:boardId" element={<BoardPage />} />
      </Route>
      <Route path="/" element={<AuthPage />} />
    </Routes>
  );
};

export default App;

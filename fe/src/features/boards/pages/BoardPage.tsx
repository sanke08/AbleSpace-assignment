import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import BoardHeader from "../components/BoardHeader";

const BoardPage = () => {
  const { workspaceId, boardId } = useParams<{
    workspaceId: string;
    boardId: string;
  }>();
  const { data, isLoading } = useBoard({
    boardId: boardId!,
    workspaceId: workspaceId!,
  });

  if (isLoading) return <Loader className="animate-spin" />;

  if (!data) return <p>Board not found</p>;

  return (
    <div className="space-y-4 h-[200vh]">
      <BoardHeader board={data.board} member={data.member} />
    </div>
  );
};

export default BoardPage;

import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { useBoard } from "../hooks/useBoard";
import BoardHeader from "../components/BoardHeader";
import ListContainer from "../components/ListContainer";

const BoardPage = () => {
  const { workspaceId, boardId } = useParams<{
    workspaceId: string;
    boardId: string;
  }>();
  const { data, isLoading, error } = useBoard({
    boardId: boardId!,
    workspaceId: workspaceId!,
  });

  if (isLoading) return <Loader className="animate-spin" />;

  if (!data || error) return <p>Board not found</p>;

  return (
    <div className="space-y-4">
      <BoardHeader board={data.board} member={data.member} />
      <ListContainer
        lists={data.board.lists}
        workspaceId={workspaceId!}
        boardId={boardId!}
      />
    </div>
  );
};

export default BoardPage;

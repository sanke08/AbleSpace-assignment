import type { Board } from "@/lib/types";
import { Link } from "react-router-dom";

type Props = {
  boards?: Board[];
  workspaceId: string;
};

const BoardList = ({ boards, workspaceId }: Props) => {
  if (!boards?.length) {
    return <p className="text-sm text-muted-foreground">No boards found</p>;
  }

  return (
    <>
      {boards.map((board) => (
        <Link
          key={board.id}
          to={`/workspace/${workspaceId}/boards/${board.id}`}
          className="w-full h-20 relative overflow-hidden group rounded-lg"
        >
          <p className="absolute top-0 left-0 p-2 text-white text-sm font-medium">
            {board.title}
          </p>
        </Link>
      ))}
    </>
  );
};

export default BoardList;

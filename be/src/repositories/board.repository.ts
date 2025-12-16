import { db } from "../utils/db.js";

export const findBoardsByName = ({ name }: { name: string }) => {
  return db.board.findMany({
    where: { title: { startsWith: name } },
  });
};

export const getBoardsByWorkspaceId = ({
  workspaceId,
}: {
  workspaceId: string;
}) => {
  return db.workspace.findFirst({
    where: { id: workspaceId },
    select: {
      id: true,
      name: true,

      boards: { select: { id: true, title: true } },
    },
  });
};

export const findBoardById = ({
  boardId,
  workspaceId,
}: {
  boardId: string;
  workspaceId: string;
}) => {
  return db.board.findUnique({
    where: { id: boardId, workspaceId },
    include: { workspace: true },
  });
};

export const createBoard = ({
  title,
  workspaceId,
}: {
  title: string;
  workspaceId: string;
}) => {
  return db.board.create({
    data: { title, workspaceId },
  });
};

export const updateBoard = (
  boardId: string,
  data: { title?: string; imageUrl?: string }
) => {
  const updateData: Record<string, any> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;

  // If nothing to update, throw an error
  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided to update");
  }

  return db.board.update({
    where: { id: boardId },
    data: updateData,
  });
};

export const updateBoardTrash = ({
  boardId,
  trash,
}: {
  boardId: string;
  trash: boolean;
}) => {
  return db.board.update({
    where: { id: boardId },
    data: { trash },
  });
};

export const deleteBoardById = ({ boardId }: { boardId: string }) => {
  return db.board.delete({ where: { id: boardId } });
};

export const getBoardDetail = ({
  boardId,
  workspaceId,
  userId,
}: {
  boardId: string;
  workspaceId: string;
  userId: string;
}) => {
  return db.board.findUnique({
    where: { id: boardId, workspaceId },
    include: {
      lists: {
        where: { trash: false },
        include: { tasks: { select: { id: true, title: true } } },
      },
      workspace: {
        select: {
          members: { where: { userId: userId } },
        },
      },
    },
  });
};

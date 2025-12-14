import { db } from "../utils/db.js";

export const findListWithCards = (
  listId: string,
  boardId: string,
  workspaceId: string
) => {
  return db.list.findFirst({
    where: {
      id: listId,
      boardId,
      board: { workspaceId },
    },
    include: { tasks: true },
  });
};

export const createListCopy = (
  boardId: string,
  title: string,
  tasks: { title: string; description: string }[]
) => {
  return db.list.create({
    data: {
      boardId,
      title,
      tasks: { createMany: { data: tasks } },
    },
    include: { tasks: true },
  });
};

export const findListByIdWithWorkspace = (listId: string) => {
  return db.list.findUnique({
    where: { id: listId },
    include: {
      board: { include: { workspace: true } },
    },
  });
};

export const updateListTrash = (listId: string, trash: boolean) => {
  return db.list.update({
    where: { id: listId },
    data: { trash },
  });
};

export const deleteListById = (listId: string) => {
  return db.list.delete({ where: { id: listId } });
};

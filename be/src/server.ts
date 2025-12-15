import http from "http";
import app from "./app.js";
import { Server } from "socket.io";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join-board", (boardId: string) => {
    socket.join(`board:${boardId}`);
  });

  socket.on("leave-board", (boardId: string) => {
    socket.leave(`board:${boardId}`);
  });
});

export default server;

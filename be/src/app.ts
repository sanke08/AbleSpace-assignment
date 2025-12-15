import express, {
  type Express,
  type Request,
  type Response,
  // type NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
// import { AppError } from "./utils/appError.js";
import taskRouter from "./routes/task.routes.js";
import listRouter from "./routes/list.routes.js";
import boardRouter from "./routes/board.routes.js";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workspaces", workspaceRouter);
// app.use("/api/v1/boards", boardRouter);
// app.use("/api/v1/lists", listRouter);
// app.use("/api/v1/tasks", taskRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(globalErrorHandler);

export default app;

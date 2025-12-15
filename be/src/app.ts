import express, {
  type Express,
  type Request,
  type Response,
  // type NextFunction,
} from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
// import { AppError } from "./utils/appError.js";
import taskRouter from "./routes/task.routes.js";
import listRouter from "./routes/list.routes.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workspaces", workspaceRouter);
app.use("/lists/:listId/tasks", taskRouter);
app.use("/boards/:boardId/lists", listRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

export default app;

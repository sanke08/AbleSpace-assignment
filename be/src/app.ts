import express, { type Express, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";
import workspaceRouter from "./routes/workspace.routes.js";
import { AppError } from "./utils/appError.js";
import { type NextFunction } from "express";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/workspaces", workspaceRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;

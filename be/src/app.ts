import express, { type Express, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import authRouter from "./routes/auth.routes.js";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.route("/").get((req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(globalErrorHandler);

export default app;

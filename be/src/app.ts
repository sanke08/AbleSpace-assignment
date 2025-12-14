import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

app.route("/").get((req: Request, res: Response) => {
  res.send("Hello World");
});

export default app;

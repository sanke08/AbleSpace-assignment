import express, { type Router } from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import memberRouter from "./member.routes.js";
import boardRouter from "./board.routes.js";

const router: Router = express.Router();

router.use(protect); // All workspace routes need auth

router
  .route("/")
  .get(workspaceController.getAll)
  .post(workspaceController.create);

router
  .route("/:id")
  .get(workspaceController.get)
  .patch(workspaceController.update)
  .delete(workspaceController.deleteWs);

router.use("/:workspaceId/boards", boardRouter);
router.use("/:workspaceId/members", memberRouter);

export default router;

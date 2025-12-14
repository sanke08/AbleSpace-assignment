import express, { type Router } from "express";
import * as workspaceController from "../controllers/workspace.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import memberRouter from "./member.routes.js";

const router: Router = express.Router();

router.use(protect); // All workspace routes need auth

router
  .route("/")
  .get(workspaceController.getAll)
  .post(workspaceController.create);

router
  .route("/:id")
  .patch(workspaceController.update)
  .delete(workspaceController.deleteWs);

// Member Routes nested under workspace logic
// router.post("/:workspaceId/members/join", memberController.join);
// router.delete("/:workspaceId/members/leave", memberController.leave);

// router.patch("/:workspaceId/members/:memberId", memberController.updateRole);
// router.delete("/:workspaceId/members/:memberId", memberController.remove);

router.use("/:workspaceId/members", memberRouter);

export default router;

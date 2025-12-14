import express, { type Router } from "express";
import * as memberController from "../controllers/member.controller.js";

const router: Router = express.Router({ mergeParams: true }); // Important for nested routes

// Routes here automatically inherit workspaceId from parent
router.post("/join", memberController.join);
router.delete("/leave", memberController.leave);

router.patch("/:memberId", memberController.updateRole);
router.delete("/:memberId", memberController.remove);

export default router;

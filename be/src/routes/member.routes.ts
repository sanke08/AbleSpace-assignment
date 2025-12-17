import express, { type Router } from "express";
import * as memberController from "../controllers/member.controller.js";

const router: Router = express.Router({ mergeParams: true }); // Important for nested routes

// Get all members of a workspace
router.get("/", memberController.getWorkspaceMembers);

// Add member to workspace
// router.post("/", memberController.addMember);

// Update member role
// router.patch("/:memberId", memberController.updateMemberRole);

// Remove member from workspace
// router.delete("/:memberId", memberController.removeMember);

router.post("/join", memberController.join);
router.delete("/leave", memberController.leave);

router.patch("/:memberId", memberController.updateRole);
router.delete("/:memberId", memberController.remove);

export default router;

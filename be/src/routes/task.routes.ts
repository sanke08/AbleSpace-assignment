import * as taskController from "../controllers/task.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router: Router = Router();

router.use(protect);

router.post("/", taskController.createTask);
router.patch("/:taskId", taskController.updateTask);
router.delete("/:taskId", taskController.deleteTask);

export default router;

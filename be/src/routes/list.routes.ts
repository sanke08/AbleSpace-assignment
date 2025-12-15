import { Router } from "express";
import * as listController from "../controllers/list.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router: Router = Router({ mergeParams: true });

router.use(protect);

router.post("/", listController.createList);
router.patch("/:listId", listController.updateList);
router.delete("/:listId", listController.deleteList);

export default router;

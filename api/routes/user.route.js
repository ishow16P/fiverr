import Express from "express";
import { getUser, deleteUser } from "../controllers/user.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.get("/:id", getUser);
router.delete("/:id", authToken, deleteUser);

export default router;

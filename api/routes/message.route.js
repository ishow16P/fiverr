import Express from "express";
import { createMessage, getMessages } from "../controllers/message.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.post("/", authToken, createMessage);
router.get("/:id", authToken, getMessages);

export default router;

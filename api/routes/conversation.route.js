import Express from "express";
import { getConversation } from "../controllers/conversation.controller.js";
const router = Express.Router();

router.get("/test", getConversation);

export default router;

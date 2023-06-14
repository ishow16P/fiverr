import Express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.get("/", authToken, getConversations);
router.post("/", authToken, createConversation);
router.get("/single:/:id", authToken, getSingleConversation);
router.put("/:id", authToken, updateConversation);

export default router;

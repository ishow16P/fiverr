import Express from "express";
import { getMessage } from "../controllers/message.controller.js";
const router = Express.Router();

router.get("/test", getMessage);

export default router;

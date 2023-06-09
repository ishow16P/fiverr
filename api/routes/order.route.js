import Express from "express";
import { getOrder } from "../controllers/order.controller.js";
const router = Express.Router();

router.get("/test", getOrder);

export default router;

import Express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.post("/:gigId", authToken, createOrder);
router.get("/", authToken, getOrders);

export default router;

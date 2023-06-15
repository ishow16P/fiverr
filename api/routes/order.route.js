import Express from "express";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.get("/", authToken, getOrders);
router.post("/create-payment-intent/:id", authToken, intent);
router.put("/", authToken, confirm);

export default router;

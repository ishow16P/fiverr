import Express from "express";
import { getReview } from "../controllers/review.controller.js";
const router = Express.Router();

router.get("/test", getReview);

export default router;

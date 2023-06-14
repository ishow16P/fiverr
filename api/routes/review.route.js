import Express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
} from "../controllers/review.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.post("/", authToken, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", authToken, deleteReview);

export default router;

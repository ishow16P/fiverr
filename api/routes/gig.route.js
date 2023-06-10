import Express from "express";
import {
  getGig,
  createGig,
  deleteGig,
  getGigs,
} from "../controllers/gig.controller.js";
import { authToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.post("/", authToken, createGig);
router.delete("/:id", authToken, deleteGig);
router.get("/single/:id", authToken, getGig);
router.get("/", authToken, getGigs);

export default router;

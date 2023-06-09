import Express from "express";
import { getGig } from "../controllers/gig.controller.js";
const router = Express.Router();

router.get("/test", getGig);

export default router;

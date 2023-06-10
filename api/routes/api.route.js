import Express from "express";
import userRoute from "./user.route.js";
import conversationRoute from "./conversation.route.js";
import gigRoute from "./gig.route.js";
import messageRoute from "./message.route.js";
import orderRoute from "./order.route.js";
import reviewRoute from "./review.route.js";
import authRoute from "./auth.rote.js"
import uploadRoute from "./upload.route.js"

const router = Express.Router();

router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/conversations", conversationRoute);
router.use("/gigs", gigRoute);
router.use("/messages", messageRoute);
router.use("/orders", orderRoute);
router.use("/reviews", reviewRoute);
router.use("/images", uploadRoute)

export default router;

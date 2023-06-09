import Express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/auth.controller.js";
import { authRefreshToken } from "../middleware/auth.middleware.js";
const router = Express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/token", authRefreshToken, refreshToken);

export default router;

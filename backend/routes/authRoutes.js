import express from "express";
import { registerUser, login, logout } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
import { changePassword } from "../controllers/auth.controller.js";
router.post("/register", registerUser);

router.post("/login", login);

router.post("/logout", logout);
router.post("/change-password", protectRoute, changePassword);

export default router;
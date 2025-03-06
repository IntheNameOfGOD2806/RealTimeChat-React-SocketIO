import express from "express";
import { registerUser, login, logout, refreshToken } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", login);

router.post("/logout", logout);

router.get("/refresh-token", refreshToken);

export default router;
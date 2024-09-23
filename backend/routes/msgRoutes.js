import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
const msgRoutes = Router();
msgRoutes.get("/:id",protectRoute,getMessages);
msgRoutes.post("/sendMessage/:receiverId", protectRoute, sendMessage);
export default msgRoutes;  
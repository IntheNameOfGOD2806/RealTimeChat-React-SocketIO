import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, sendMessage, updateMessage, deleteMessage } from "../controllers/message.controller.js";
const msgRoutes = Router();
msgRoutes.get("/:id", protectRoute, getMessages);
msgRoutes.post("/sendMessage/:receiverId", protectRoute, sendMessage);
// update message
msgRoutes.put("/updateMessage/:id", protectRoute, updateMessage);
//delete message
msgRoutes.delete("/deleteMessage/:id", protectRoute, deleteMessage);

export default msgRoutes;

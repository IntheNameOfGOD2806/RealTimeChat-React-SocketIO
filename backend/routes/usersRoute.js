import { Router } from "express";
import { getUsers } from "../controllers/usersController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const usersRoute = Router();

usersRoute.get("/", protectRoute, getUsers);
export default usersRoute;  
import { Router } from "express";
import { getUsers, searchUsers } from "../controllers/usersController.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const usersRoute = Router();

usersRoute.get("/",
    protectRoute,
    getUsers);
usersRoute.get("/search",
    protectRoute,
    searchUsers);
export default usersRoute;
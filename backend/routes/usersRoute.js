import { Router } from "express";
import {
  getUserById,
  getUsers,
  searchUsers,
} from "../controllers/usersController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const usersRoute = Router();

usersRoute.get("/", protectRoute, getUsers);
usersRoute.get("/:id", protectRoute, getUserById);
usersRoute.get("/search", protectRoute, searchUsers);
export default usersRoute;

import { Router } from "express";
import {
  getUserById,
  getUsers,
  searchUsers,
  updateUser,
} from "../controllers/usersController.js";
import { protectRoute } from "../middleware/protectRoute.js";
const usersRoute = Router();

usersRoute.get("/", protectRoute, getUsers);
usersRoute.get("/search", protectRoute, searchUsers);
usersRoute.get("/:id", protectRoute, getUserById);
usersRoute.put("/:id", protectRoute, updateUser);
export default usersRoute;

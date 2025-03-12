import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { removeAllFromCart } from "../controllers/cart.controller.js";
import { addProductToCart } from "../controllers/cart.controller.js";
import { updateQuantity } from "../controllers/cart.controller.js";
import { getCartItems } from "../controllers/cart.controller.js";
const couponRoutes = Router();

couponRoutes.post("/", protectRoute, addProductToCart);
couponRoutes.get("/", protectRoute,getCartItems);
couponRoutes.delete("/delete", protectRoute, 
    removeAllFromCart
);
couponRoutes.put("/update/:id", protectRoute, 
    updateQuantity
)
export default couponRoutes;

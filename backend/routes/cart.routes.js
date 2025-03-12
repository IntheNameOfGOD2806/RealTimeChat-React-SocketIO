import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { removeAllFromCart } from "../controllers/cart.controller.js";
import { addProductToCart } from "../controllers/cart.controller.js";
import { updateQuantity } from "../controllers/cart.controller.js";
import { getCartItems } from "../controllers/cart.controller.js";
const cartRoutes = Router();
//add to cart
cartRoutes.post("/", protectRoute, addProductToCart);
cartRoutes.get("/", protectRoute,getCartItems);
cartRoutes.delete("/delete", protectRoute, 
    removeAllFromCart
);
cartRoutes.put("/update/:id", protectRoute, 
    updateQuantity
)
export default cartRoutes;

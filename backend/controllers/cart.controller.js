import User from "../models/user.model.js";
import Category from "../models/category.model.js";
export const addProductToCart = async (req, res) => {
  try {
    const { _id: productId } = req.body;
    const user = req.user;

    const existingProduct = user?.cartItems?.find(
      (item) => item.product === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }
    //check stock
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        error: "Not enough stock",
      });
    }
    const { quantity } = req.body;
    const user = req.user;
    const existingProduct = user?.cartItems?.find(
      (item) => item.product === productId
    );
    if (existingProduct) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.product !== productId
        );
      } else {
        existingProduct.quantity = quantity;
      }
    } else {
      return res.status(404).json({
        success: false,
        error: "Product not found in cart",
      });
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "Product quantity updated",
      cart: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    user.cartItems = [];
    await user.save();
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      cart: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      cart: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;
    const products = await Product.find({
      _id: { $in: user.cartItems.map((item) => item.product) },
    });
    const cartItems = products.map((product) => {
      const cartItem = user.cartItems.find(
        (item) => item.product.toString() === product._id.toString()
      );
      return { ...product, quantity: cartItem.quantity };
    });
    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

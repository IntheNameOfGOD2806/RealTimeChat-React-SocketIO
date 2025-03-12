import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        success: false,
        error: "No access token provided",
      });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      } else {
        req.user = user;
        next();
      }
    } catch (error) {
      if(error.name === 'TokenExpiredError'){
        return res.status(401).json({
          success: false,
          error: 'Token expired',
        });
      }
      if(error.name === 'JsonWebTokenError'){
        return res.status(401).json({
          success: false,
          error: 'Invalid access token',
        });
      }
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const adminRoute = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      error: "Access denied - Admin only",
      message: "You are not authorized to access this resource",
    });
  }
  next();
};
import jwt from "jsonwebtoken";
import redis from "../libs/redis.js";
/**
 * Generates a JWT token and sets a cookie on the response object
 * @param {ObjectId} userId - The ObjectId of the user
 * @param {Response} res - The response object
 */
export const generateTokenAndSetCookie = (userId, res) => {
  
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
	const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		secure: true
	});

	res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		secure: true
	});

	return { accessToken, refreshToken };
}
export const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refreshToken:${userId}`, refreshToken, "EX", 15 * 24 * 60 * 60);
}
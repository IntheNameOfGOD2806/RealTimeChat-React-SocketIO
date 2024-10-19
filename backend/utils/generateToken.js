import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets a cookie on the response object
 * @param {ObjectId} userId - The ObjectId of the user
 * @param {Response} res - The response object
 */
export const generateTokenAndSetCookie = (userId, res) => {
  
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("jwt", token, {
      
		maxAge: 15 * 24 * 60 * 60 * 1000, // MS
		httpOnly: false, // prevent XSS attacks cross-site scripting attacks
		// sameSite: "none", // CSRF attacks cross-site request forgery attacks
		secure: false
	});
}

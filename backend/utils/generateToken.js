import jwt from "jsonwebtoken";

/**
 * Generates a JWT token and sets a cookie on the response object
 * @param {ObjectId} userId - The ObjectId of the user
 * @param {Response} res - The response object
 */
export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("jwt", token, {
        httpOnly: true,//prevents XSS attacks
        secure:process.env.NODE_ENV==="production",//prevents HTTP attacks
        maxAge: 15 * 24 * 60 * 60 * 1000,//15 days
        sameSite: "strict",//prevents CSRF attacks
    });
}

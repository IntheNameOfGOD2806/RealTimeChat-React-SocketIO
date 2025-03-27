import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { io } from "../socket/socket.js";
export const registerUser = async (req, res) => {
    try {
        const { username, fullName, password, confirmPassword, gender, profileImage } = req.body;
        console.log(req.body);
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                error: "Password and Confirm Password do not match"
            });
        }
        // check if username already exists
        const checkDuplicateUsername = await User.findOne({ username });
        if (checkDuplicateUsername) {
            return res.status(400).json({
                success: false,
                error: "Username already exists"
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // generate profile picture
        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            username,
            fullName,
            password: hashedPassword,
            gender,
            profilePicture: profileImage || (gender === "male" ? boyProfilePicture : girlProfilePicture)
        })
        // save user to database
        newUser && await newUser.save();
        // generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);
        io.emit("listUsers");
        newUser && res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        console.log(error);
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "invalid username or password"
            });
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                error: "Incorrect password"
            });
        }
        // generate token and set cookie
        generateTokenAndSetCookie(user._id, res);
        user && res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
//changePassword
 export const changePassword = async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;
        // find user by username
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found"
            });
        }
        // check password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, user?.password || "");
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                error: "Incorrect password"
            });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // update password
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
     } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
     }
 }
// test

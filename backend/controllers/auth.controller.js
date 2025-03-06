import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.model.js";
import {
  generateTokenAndSetCookie,
  storeRefreshToken,
} from "../utils/generateToken.js";
import OTP from "../models/otp.model.js";
import redis from "../libs/redis.js";
export const registerUser = async (req, res) => {
  try {
    const { email, fullName, password, confirmPassword, gender } = req.body;
    if (!email || !fullName || !password || !confirmPassword || !gender) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log(req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password do not match",
      });
    }
    // check if email already exists
    const checkDuplicateemail = await User.findOne({ email });
    if (checkDuplicateemail) {
      return res.status(400).json({
        success: false,
        error: "email already exists",
      });
    }
    // Find the most recent OTP for the email
    // const response = await OTP.find({ email: email })
    //   .sort({ createdAt: -1 })
    //   .limit(1)
    //   .lean();
    // // console.log(">>>>> response:::::", response);
    // if (!response || response.length === 0 || otp !== response[0].otp) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "The OTP is not valid or expired",
    //   });
    // }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // generate profile picture
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?email=${email}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?email=${email}`;
    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });
    // save user to database
    newUser && (await newUser.save());
    // generate token and set cookie
    const { accessToken, refreshToken } = generateTokenAndSetCookie(
      newUser._id,
      res
    );
    await storeRefreshToken(newUser._id, refreshToken);
    newUser &&
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "invalid email or password",
      });
    }
    // check password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: "Incorrect password",
      });
    }
    // generate token and set cookie
    const { accessToken, refreshToken } = generateTokenAndSetCookie(
      user._id,
      res
    );
    await storeRefreshToken(user._id, refreshToken);
    user &&
      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
   const refreshToken = req.cookies.refreshToken;
   if (!refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    await redis.del(`refreshToken:${decoded.userId}`);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({
      success: true,
      message: "User logged out successfully"
    })
   }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};
//refresh token
export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: "No refresh token provided",
      });
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const storedToken = await redis.get(`refreshToken:${decoded.userId}`);
    // check if refresh token is valid
    if (refreshToken !== storedToken) {
      return res.status(401).json({
        success: false,
        error: "Invalid refresh token",
      });
    }
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      secure: true
    });
    res.json({
      success: true,
      accessToken,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "something went wrong",
    });
  }
};
// test

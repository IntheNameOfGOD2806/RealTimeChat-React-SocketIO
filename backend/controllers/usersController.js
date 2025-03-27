import User from "../models/user.model.js";


export const getUsers = async (req, res) => {

    const userLoggedIn = req.user._id;
    try {
        const users = await User.find({
            _id: { $ne: userLoggedIn }
        });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export const searchUsers = async (req, res) => {

    const keyword = req.query.keyword;
    console.log('dasdsda',keyword)
    if(!keyword)
    return res.status(400).json({
        success: false,
        error: "Please provide keyword"
    });
    try {
        const users = await User.find({
            username: { $regex: keyword, $options: "i" }
        });
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, fullName, gender, profilePicture } = req.body;
    if(!username || !fullName || !gender || !profilePicture) {
        return res.status(400).json({
            success: false,
            error: "Please provide all required fields"
        });
    }
    //check duplicate username
    const checkDuplicateUsername = await User.findOne({ username,
        _id: { $ne: userId }
     });
    if (checkDuplicateUsername ) {
        return res.status(400).json({
            success: false,
            error: "Username already exists"
        });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }
        user.username = username;
        user.fullName = fullName;
        user.gender = gender;
        user.profilePicture = profilePicture??'';
        await user.save();
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}
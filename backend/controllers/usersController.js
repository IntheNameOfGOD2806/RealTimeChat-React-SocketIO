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
export const searchUsers = async (req, res) => {

    const keyword = req.query.keyword;
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
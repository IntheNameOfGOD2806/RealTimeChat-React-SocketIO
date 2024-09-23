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
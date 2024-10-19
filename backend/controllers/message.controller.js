import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
    try {
        // console.log("asdsada:::",req.user);
        const { message } = req.body;
        const { receiverId } = req.params;
        const senderId = req.user._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: []
            })
            // await conversation.save();
        }
        const newMessage = new Message({
            senderId,
            receiverId, // receiverId       
            message
        })
        // add msg id to conversation
        newMessage && conversation.messages.push(newMessage._id);
        //Socket.io functionality


        //
        if (conversation && newMessage) {
            Promise.all([conversation.save(), newMessage.save()])
        }
        if (newMessage) {
            res.status(200).json({
                success: true,
                message: "Message sent successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");
        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: "Conversation not found"
            });
        }
        conversation && res.status(200).json({
            success: true,
            data: conversation.messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}   
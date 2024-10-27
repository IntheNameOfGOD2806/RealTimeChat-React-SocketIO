import axios from "../utils/axiosCustomize";

const getlistUsers = () => {
    return axios.get(
        `api/users`,
        { withCredentials: true }
    );
}
const getAllMessagesOfConversation = (id) => {
    return axios.get(
        `api/msg/${id}`,
        { withCredentials: true }
    );
}
const sendMessage = (receiverId, message) => {
    return axios.post(
        `api/msg/sendMessage/${receiverId}`,
        { message },
        { withCredentials: true }
    );
}
const searchUsers = (keyword) => {
    return axios.get(
        `api/users/search?keyword=${keyword}`,
        { withCredentials: true }
    );
}

export {
    getlistUsers,getAllMessagesOfConversation,sendMessage,searchUsers
};

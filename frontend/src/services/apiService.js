import axios from "../utils/axiosCustomize";

const getlistUsers = () => {
    return axios.get(
        `api/users`,
        { withCredentials: true }
    );
}
const getUserById = (id) => {
    return axios.get(
        `api/users/${id}`,
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


const handleFileUpload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("api/cloud-upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response?.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
const updateUser = (user) => {
    return axios.put(
        `api/users/${user._id}`,
        user,
        { withCredentials: true }
    );
};
const deleteFile = (publicId) => {
    return axios.delete(
        `api/cloud-upload/${publicId}`,
        { withCredentials: true }
    );
};
export {
    getlistUsers,getAllMessagesOfConversation,sendMessage,searchUsers,getUserById,handleFileUpload,updateUser,deleteFile
};

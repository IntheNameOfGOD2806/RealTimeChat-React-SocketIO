/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { getUserById } from "../services/apiService";


const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("receive_message", async (data) => {
      const user = await getUserById(data?.senderId);
      toast.success(`new message from ${user?.fullName}: ${data?.message}`, {
        duration: 5000,
        position: "top-right",
      });
      setMessages([...messages, data]);
    });
    return () => {
      socket?.off("receive_message");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

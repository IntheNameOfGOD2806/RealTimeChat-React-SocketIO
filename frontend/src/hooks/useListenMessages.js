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
      //tt sender
      const user = await getUserById(data?.senderId);
      //gui tb
      toast.success(`new message from ${user?.data?.fullName}: ${data?.message}`, {
        duration: 5000,
        position: "top-right",
      });
      console.log('data',data)
      setMessages([...messages, data]);
    });
    return () => {
      socket?.off("receive_message");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

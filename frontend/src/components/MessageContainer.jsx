import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInp";
// import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAllMessagesOfConversation } from "../services/apiService";
import useConversation from "../zustand/useConversation";
import { MessageSkeleton } from "./skeletons/MessageSkeleton";
export default function MessageContainer() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const messages = await getAllMessagesOfConversation(
          selectedConversation?._id
        );
        if (messages?.success === false) {
          setMessages([]);
        } else setMessages(messages?.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    selectedConversation?._id !== undefined && fetchMessages();
    // return () => {
    //   setSelectedConversation(null);

    // };
  }, [selectedConversation?._id]);
  return (
    <>
      {loading && (
        <div className="chat w-full h-full flex mx-auto items-center justify-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {!!selectedConversation?._id === false ? (
        <div className="chat w-full h-full flex mx-auto items-center justify-center">
          Please select a conversation
        </div>
      ) : (
        <div className="md:min-w-[400px] overflow-auto pt-3  h-full flex flex-col gap-28">
          {messages &&
            messages?.length > 0 &&
            messages.map((message) => {
              return <Message key={message?._id} message={message} />;
            })}

          {messages?.length === 0 && (
            <div className="chat w-full h-full flex mx-auto items-center justify-center">
              send your first message to start a conversation
            </div>
          )}
        </div>
      )}

      <div className="chat w-full h-16 absolute -bottom-20 left-0 ">
        <MessageInput />
      </div>
    </>
  );
}

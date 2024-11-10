import Message from "./Message/Message";
import MessageInput from "./MessageInput/MessageInp";
// import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { getAllMessagesOfConversation } from "../services/apiService";
import useConversation from "../zustand/useConversation";
import useListenMessages from "../hooks/useListenMessages";
// import { MessageSkeleton } from "./skeletons/MessageSkeleton";
export default function MessageContainer() {
  //socket logic
  useListenMessages();
  //
  const [loading, setLoading] = useState(false);
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
  const LastMessageRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const { selectedConversation, messages, setMessages } = useConversation();
  useEffect(() => {
    selectedConversation?._id !== undefined && fetchMessages();
  }, [selectedConversation?._id, setMessages,]);
  useEffect(() => {
    setTimeout(() => {
      LastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
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
              return (
                <div key={message._id} ref={LastMessageRef}>
                  <Message message={message} loading={loading} />
                </div>
              );
            })}

          {messages?.length === 0 && (
            <div className="chat w-full h-full flex mx-auto items-center justify-center">
              send your first message to start a conversation
            </div>
          )}
        </div>
      )}

      <div className="chat w-full h-16 absolute -bottom-20 left-0 ">
        <MessageInput 
          fetchMessages={fetchMessages}
        />
      </div>
    </>
  );
}

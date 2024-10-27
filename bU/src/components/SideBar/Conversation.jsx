import PropTypes from "prop-types";
import "./conversation.css";
import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";
export default function Conversation({ conversation }) {
  Conversation.propTypes = {
    conversation: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAdmin: PropTypes.bool.isRequired,
      password: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  };
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isSelected, setIsSelected] = useState(false);
  const isOnline = onlineUsers?.includes(conversation?._id);
  useEffect(() => {
    if (selectedConversation && selectedConversation._id === conversation._id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedConversation, conversation]);
  return (
    <>
      <div
        className={
          "px-4 py-2 flex gap-5 conv-element" +
          ` ${isSelected ? "bg-selected" : ""}`
        }
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 rounded-full">
            <span className="text-3xl">
              <img src={conversation.profilePicture} alt="" />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span
            style={{
              maxWidth: "200px",
            }}
            className="text-ellipsis overflow-hidden whitespace-nowrap font-bold text-pink-400"
          >
            {conversation.username}
          </span>
          <span
            style={{
              maxWidth: "200px",
            }}
            className=" text-ellipsis overflow-hidden whitespace-nowrap  text-gray-400"
          >
            {conversation.fullName}
          </span>
        </div>
        <div>
          {isOnline ? (
            <span className="text-green-500"> Online</span>
          ) : (
            <span className="text-gray-500">Offline</span>
          )}
        </div>
      </div>
    </>
  );
}

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { MessageSkeleton } from "../skeletons/MessageSkeleton";
export default function Message(props) {
  
  const [isSender, setIsSender] = useState(false);
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    if (selectedConversation?._id === props?.message?.senderId) {
      setIsSender(true);
    }
  }, [selectedConversation?._id, props?.message?.senderId]);
  Message.propTypes = {
    message: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      senderId: PropTypes.string.isRequired,
      receiverId: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired,
  };
  return (
    <>
      {/* { props?.loading===true && <MessageSkeleton />} */}
      {isSender === true ? (
        <div className="flex flex-row relative">
          <div className={"flex flex-row absolute"}>
            <div className="avatar ">
              <div className="w-20 rounded-full">
                <img loading="lazy" src={selectedConversation?.profilePicture} />
              </div>
            </div>
            <div className="message ml-2 relative top-2">
              <div className="chat-bubble ">{props?.message?.message}</div>
              <div className="chat-footer opacity-50"> Sent at {extractTime(props?.message?.createdAt)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row relative">
          <div className={"flex flex-row-reverse absolute right-0 "}>
            <div className="avatar ">
              <div className="w-20 rounded-full"> 
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="message ml-2 relative top-2">
              <div className="chat-bubble">{props?.message?.message}</div>
              <div className="chat-footer opacity-50">Sent at {extractTime(props?.message?.createdAt)}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

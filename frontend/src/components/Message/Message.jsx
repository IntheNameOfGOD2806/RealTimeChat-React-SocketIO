/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { Dropdown } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from 'uuid';
export default function Message(props) {
  const { editMsg, setEditMsg, message } = props;

  const items = [
    {
      key: uuidv4(),
      label: <div onClick={() => setEditMsg(message?._id)}>Edit</div>,
    },
    {
      key: uuidv4(),
      label: <div onClick={() => setEditMsg(message?._id)}>Delete</div>,
    },
  ];
  const { authUser } = useAuthContext();
  const [isSender, setIsSender] = useState(false);
  const [messageEdit, setMessageEdit] = useState("");
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
  // console.log(editMsg?.toString(), (message?._id)?.toString());
  return (
    <>
      {/* { props?.loading===true && <MessageSkeleton />} */}
      {isSender === true ? (
        <div className="flex flex-row relative">
          <div className={"flex flex-row absolute"}>
            <div className="avatar ">
              <div className="w-20 rounded-full">
                <img
                  loading="lazy"
                  src={selectedConversation?.profilePicture}
                />
              </div>
            </div>
            <div className="message ml-2 relative top-2">
              {editMsg?.toString() === (message?._id)?.toString() ? (
                <>
                  <textarea
                    value={props?.message?.message}
                    onChange={(e) => setMessageEdit(e.target.value)}
                    className="textarea"
                    placeholder="Bio"
                  ></textarea>
                </>
              ) : (
                <div className="chat-bubble ">{props?.message?.message}</div>
              )}
              <div className="chat-footer opacity-50">
                {" "}
                Sent at {extractTime(props?.message?.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-row relative">
          <div className={"flex flex-row-reverse absolute right-0 "}>
            <div className="avatar ">
              <div className="w-20 rounded-full">
                <img src={authUser?.profilePicture} />
              </div>
            </div>
            <div className="message ml-2 relative top-2">
              <div className="chat-bubble">{props?.message?.message}</div>
              <div className="chat-footer opacity-50">
                Sent at {extractTime(props?.message?.createdAt)}
              </div>
            </div>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        </div>
      )}
    </>
  );
}

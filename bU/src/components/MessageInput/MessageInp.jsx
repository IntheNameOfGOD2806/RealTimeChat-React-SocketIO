import PropTypes from "prop-types";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { sendMessage } from "../../services/apiService";
import useConversation from "../../zustand/useConversation";
// eslint-disable-next-line react/prop-types
export default function MessageInput({ fetchMessages }) {
  MessageInput.PropTypes = {
    fetchMessages: PropTypes.func.isRequired,
  };
  const { selectedConversation } = useConversation();
  const [messageInputValue, setMessageInputValue] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    await sendMessage(selectedConversation?._id, messageInputValue);
    await fetchMessages();
    setMessageInputValue("");
  };
  return (
    <>
      <form className="px-4 mt-10 w-full">
        <div style={{ width: "950px" }} className=" relative">
          <input
           
            value={messageInputValue}
            onChange={(e) => setMessageInputValue(e.target.value)}
            type="text"
            placeholder="Type your message here"
            className="outline-none ml-5 border text-sm rounded-2xl block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-pink-500 focus:border-pink-500"
          />
          <button
            type="submit"
            onClick={submitForm}
            className="absolute -right-3 top-3   "
          >
            <BsSend className="h-5 w-5 text-white " />
          </button>
        </div>
      </form>
    </>
  );
}

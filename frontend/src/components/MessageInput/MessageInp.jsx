import { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import { sendMessage } from '../../services/apiService';
import useConversation from '../../zustand/useConversation';
export default function MessageInput() {
  // @ts-ignore
  const { selectedConversation, setSelectedConversation } = useConversation();
  const[message,setMessage] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    sendMessage(selectedConversation?._id,message);
    setMessage("");
  };
  return (
    <>
      <form className="px-4 mt-10 w-full">
        <div  style={{width:"1050px"}} className="w-full relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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

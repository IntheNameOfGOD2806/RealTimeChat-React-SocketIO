import { RiArrowGoBackFill } from "react-icons/ri";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";
import "./sidebar.css";
import { useEffect, useState } from "react";
import useGetConversation from "../../hooks/useGetConversation";
export default function SideBar() {
  const { loading, conversation } = useGetConversation();
  const[isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  return (
    <>
      <div className="w-full h-5/6 sidebar-container">
        <div>
          <SearchInput />
        </div>
        <div className="flex  relative flex-col w-full h-full mt-1 conv-container border-b  border-solid border-slate-500">
          {loading && isMounted ? (
            <div className="flex flex-col w-full h-full">
              <span className=" absolute top-40 left-40  loading loading-bars loading-xs"></span>
            </div>
          ) : (
            <>
              {conversation.length > 0 ? (
                <div className="">
                  {conversation.map((conversation) => (
                    <Conversation
                      key={conversation._id}
                      conversation={conversation}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col w-full h-full">
                  <p>No Conversation Found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-3 left-5">
        <RiArrowGoBackFill className="w-8 h-8" />
      </div>
    </>
  );
}

import { RiArrowGoBackFill } from "react-icons/ri";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";
import "./sidebar.css";
import { useEffect, useState } from "react";
import useGetConversation from "../../hooks/useGetConversation";
import { useNavigate } from "react-router";
export default function SideBar() {
  const { loading, conversation, setConversation } = useGetConversation();
  const [sortedConversation, setSortedConversation] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // useEffect(() => {
  //   const sorted = [...conversation].sort((a, b) => {
  //     return new Date(b.createdAt) - new Date(a.createdAt);
  //   });
  //   setSortedConversation(sorted);
  // }, [conversation]);
  return (
    <>
      <div className="w-full h-5/6 sidebar-container">
        <div>
          <SearchInput
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortedConversation={sortedConversation}
            setSortedConversation={setSortedConversation}
            conversation={conversation}
            setConversation={setConversation}
          />
        </div>
        <div className="flex  relative flex-col w-full h-full mt-1 conv-container border-b  border-solid border-slate-500">
          {loading && isMounted ? (
            <div className="flex flex-col w-full h-full">
              <span className=" absolute top-40 left-40  loading loading-bars loading-xs"></span>
            </div>
          ) : (
            <>
              {conversation?.length > 0 && sortedConversation?.length === 0 && !sortBy && (
                <div className="">
                  {conversation.map((conversation) => (
                    <Conversation
                      key={conversation._id}
                      conversation={conversation}
                    />
                  ))}
                </div>
              )}
              {sortedConversation?.length > 0 && sortBy && (
                <div className="">
                  {sortedConversation.map((conversation) => (
                    <Conversation
                      key={conversation._id}
                      conversation={conversation}
                    />
                  ))}
                </div>
              )}
              {conversation?.length === 0 || sortedConversation?.length === 0 && sortBy && (
                <div className="flex flex-col w-full h-full">
                  <p>No Conversation Found</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-3 left-5">
        <RiArrowGoBackFill
          onClick={() => {
            navigate("/login/1");
          }}
          className="w-8 h-8"
        />
      </div>
    </>
  );
}

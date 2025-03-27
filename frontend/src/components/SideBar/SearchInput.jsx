/* eslint-disable react/prop-types */
import _ from "lodash";
import PropTypes from "prop-types";
import { getlistUsers, searchUsers } from "../../services/apiService";
import "./SearchInput.css";
import { Select } from "antd";
import { SortAscendingOutlined } from "@ant-design/icons";
import { useSocketContext } from "../../context/SocketContext";
export default function SearchInput({
  setConversation,
  sortedConversation,
  setSortedConversation,
  sortBy,
  setSortBy,
  conversation,
}) {
  SearchInput.PropTypes = {
    setConversation: PropTypes.func.isRequired,
    sortedConversation: PropTypes.array.isRequired,
    setSortedConversation: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
  };
  const { onlineUsers } = useSocketContext();
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setSortBy(value);
    if (value === "online") {
      setSortBy("online");
      setSortedConversation(() =>
        conversation.filter((user) => onlineUsers.includes(user._id))
      );
    } else if (value === "offline") {
      setSortBy("offline");
      setSortedConversation(() =>
        conversation.filter((user) => !onlineUsers.includes(user._id))
      );
    } else if (value === "female") {
      setSortBy("female");
      setSortedConversation(() =>
        conversation.filter((user) => user.gender === "female")
      );
    } else if (value === "male") {
      setSortBy("male");
      setSortedConversation(() =>
        conversation.filter((user) => user.gender === "male")
      );
    } else if (value === "all") {
      setSortBy("");
      setSortedConversation([]);
      setConversation(conversation);
    }
  };
  const fetchSearchUsers = async (keyword) => {
    const res = await searchUsers(keyword);
    console.log(res.data);
    setConversation(res.data);
  };
  const handleSearch = async (e) => {
    setSortBy("");
    const keyword = e.target.value;
    if (keyword) {
      _.debounce(() => {
        fetchSearchUsers(keyword);
      }, 300)();
    } else {
      setConversation((await getlistUsers()).data);
    }
  };
  return (
    <>
      <div className=" p-4 border-b border-solid border-slate-500">
        <input
          onChange={(e) => {
            handleSearch(e);
          }}
          type="text"
          placeholder="Search User"
          className="w-2/3 rounded-full input input-bordered input-secondary  max-w-xs"
        />
        <Select
          suffixIcon={<SortAscendingOutlined />}
          defaultValue="all"
          style={{ width: 80, marginLeft: 10, height: 40 }}
          onChange={handleChange}
          options={[
            { value: "online", label: "Online" },
            { value: "offline", label: "Offline" },
            { value: "female", label: "Female" },
            { value: "male", label: "Male" },
            { value: "all", label: "All" },
          ]}
        />
      </div>
    </>
  );
}

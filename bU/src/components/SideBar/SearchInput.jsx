import { IoSearch } from "react-icons/io5";
import "./SearchInput.css";
import { searchUsers } from "../../services/apiService";
import _ from "lodash";
import { getlistUsers } from "../../services/apiService";
export default function SearchInput({ conversation, setConversation }) {
  const fetchSearchUsers = async (keyword) => {
    const res = await searchUsers(keyword);
    console.log(res.data);
    setConversation(res.data);
  };
  const handleSearch =async (e) => {
    const keyword = e.target.value;
    if (keyword) {
      _.debounce(() => {
        fetchSearchUsers(keyword);
      }, 300)();
    } else {
      setConversation(
        (await getlistUsers()).data
      );
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
        <button className="search-button ml-5 min-w-16 btn btn-active btn-secondary rounded-2xl ">
          <IoSearch className=" h-6 w-5 outline-none" />
        </button>
      </div>
    </>
  );
}

import { IoSearch } from "react-icons/io5";
import './SearchInput.css'
export default function SearchInput() {
  return (
    <>
      <div className=' p-4 border-b border-solid border-slate-500'>
        <input
          type="text"
          placeholder="Search User"
          className="w-2/3 rounded-full input input-bordered input-secondary  max-w-xs"
        />
        <button className='search-button ml-5 min-w-16 btn btn-active btn-secondary rounded-2xl '>
        <IoSearch className=" h-6 w-5 outline-none"/>
        </button>
      </div>
    </>
  );
}

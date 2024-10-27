import MessageContainer from "../MessageContainer";
// import MessageInput from "../MessageInput/MessageInp";
import useLogout from "../../hooks/useLogout";
import SideBar from "../SideBar/SideBar";
import "./Home.css";
export default function Home() {
  const { loading, logout } = useLogout();
  return (
    <>
      <div  className="border border-solid rounded-2xl border-slate-500 backdrop-filter backdrop-blur-lg home-container flex flex-row  mx-auto">
        <div className=" flex-grow-1 min-w-96   border-r border-solid border-slate-500">
          <SideBar />
        </div>
        <div className="flex-grow-3 h-5/6 w-full message-container relative px-8">
          <MessageContainer></MessageContainer>
        </div>
      </div>{" "}
   {
    loading ? (
      <span className="loading loading-dots loading-lg"></span>
    ):
    <button
      onClick={logout}
      className="btn btn-primary mt-6"
    >
      Log Out
    </button>
   }
    </>
  );
}

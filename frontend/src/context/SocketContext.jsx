import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";
export const SocketContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);
export const SocketContextProvider = ({ children }) => {
  SocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [socket, setSocket] = useState(null);
  // const [message, setMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("https://realtimechat-react-socketio.onrender.com/", {
        query: { userId: authUser._id },
      });
      setSocket(socket);
      // socket.on("receive_message", (data) => {
      //   setMessage(data);
      // });
      socket.on("getOnlineUsers", (data) => {
        setOnlineUsers(data);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    //@ts-ignore
    <SocketContext.Provider
      value={{
        socket,
        setSocket,
        onlineUsers,
        setOnlineUsers,
      }}
    >
      {/* <button
        className="btn btn-accent"
        onClick={() => socket.emit("message", "hello")}
      >
        event trigger
      </button>
      <div>
        message:
        {message}
      </div> */}
      {children}
    </SocketContext.Provider>
  );
};

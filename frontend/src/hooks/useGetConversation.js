import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getlistUsers } from "../services/apiService";
import { useSocketContext } from "../context/SocketContext";
const useGetConversation = () => {
   
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
    const { socket } = useSocketContext();

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await getlistUsers()
                const data = await res
                if (data?.error) {
                    throw new Error(data?.error)
                }
                setConversation(data?.data)
            } catch (error) {
                toast.error(error.message)
            }
            finally {
                setLoading(false)
            }
        }
        if (socket) {
            socket.on("listUsers", () => {
                getConversation()
            });
          }
        getConversation()
    }, [])
    return { conversation, loading,setConversation }
}
export default useGetConversation   
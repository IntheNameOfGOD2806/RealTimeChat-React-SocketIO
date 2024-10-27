import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getlistUsers } from "../services/apiService";
const useGetConversation = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
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
        getConversation()
    }, [])
    return { conversation, loading,setConversation }
}
export default useGetConversation   
/* eslint-disable no-unused-vars */
import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"
import { extractTime } from "../../../frontend/src/utils/extractTime"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()


    useEffect(() => {
        socket?.on("receive_message", (data) => {
            setMessages([...messages, {
                ...data,
                createdAt:extractTime(data?.createdAt)
            }])
        })
        return () => {
            socket?.off("receive_message")
        }
    }, [socket, messages, setMessages])

}

export default useListenMessages
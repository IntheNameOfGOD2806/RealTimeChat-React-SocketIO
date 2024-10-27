
import * as React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useLogout = () => {
    const [loading, setLoading] = React.useState(false)
    const { authUser, setAuthUser } = useAuthContext()

    const logout = async () => {
        try {
            const res = await fetch('https://realtimechat-react-socketio.onrender.com/api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token: authUser?.token })
            })
            const data = await res.json()
            // console.log(">>>>check data", data);
            data?.success === true && toast.success(data?.message)
            data?.success === false && toast.error(data?.error)
            //local storage
            localStorage.removeItem("auth-user")
            //auth context
            setAuthUser(null)
            if (data.error) throw new Error(data.error || "Something went wrong")
        } catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }
    return { logout, loading }
}



export default useLogout
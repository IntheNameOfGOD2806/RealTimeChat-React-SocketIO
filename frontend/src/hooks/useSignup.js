/* eslint-disable no-unused-vars */
import * as React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
    const [loading, setLoading] = React.useState(false)
    const { authUser, setAuthUser } = useAuthContext()
    const signup = async ({ username, fullName, password, confirmPassword, gender }) => {
        // console.log(username, fullName, password, confirmPassword, gender);

        const success = handleInputsErrors({ username, fullName, password, confirmPassword, gender })
        if (!success) return
        try {
            setLoading(true)
            const res = await fetch('https://realtimechat-react-socketio.onrender.com/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, fullName, password, confirmPassword, gender })
            })
            const data = await res.json()
            // console.log(">>>>check data", data);
            data?.success === true && toast.success(data?.message)
            data?.success === false && toast.error(data?.error)
            //local storage
            localStorage.setItem("auth-user", JSON.stringify(data?.user))
            //auth context
            setAuthUser(data?.user)
        } catch (error) {
            toast.error(error.message)

        }
        finally {
            setLoading(false)
        }
    }
    return { loading, signup }
}
const handleInputsErrors = ({ username, fullName, password, confirmPassword, gender }) => {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields")
        return false
    }
    if (password !== confirmPassword) {
        toast.error("Password and Confirm Password do not match")
        return false
    }
    if (username.length < 6) {
        toast.error("Username must be at least 6 characters")
        return false
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters")
        return false
    }
    return true
}
export default useSignup
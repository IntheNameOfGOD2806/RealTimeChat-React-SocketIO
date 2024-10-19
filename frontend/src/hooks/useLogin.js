/* eslint-disable no-unused-vars */
import * as React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
const useLogin = () => {
    const [loading, setLoading] = React.useState(false)
    const { authUser, setAuthUser } = useAuthContext()
    const signIn = async ({ username, password }) => {
        // console.log(username, fullName, password, confirmPassword, gender);

        const success = handleInputsErrors({ username, password })
        if (!success) return
        try {
            setLoading(true)
            const res = await fetch('http://localhost:2806/api/auth/login', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
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
    return { loading, signIn }
}
const handleInputsErrors = ({ username, password }) => {
    if (!username || !password) {
        toast.error("Please fill all the fields")
        return false
    }

    return true
}
export default useLogin
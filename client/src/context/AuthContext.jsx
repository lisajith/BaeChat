import { postRequest, baseUrl } from "../utils/services"
import React, { createContext, useState } from "react"
import { useCallback } from "react"
import { useEffect } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
   })
   
    const [loginError, setLoginError] = useState(null)
    const [isLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })

   console.log("Userr", user)
   console.log("LoginInfo", loginInfo)
   //console.log("registerInfo", registerInfo)
   //console.log("registerError", registerError)

   useEffect(() => {
    const user = localStorage.getItem("User")
    if(user)
        setUser(JSON.parse(user))
   }, [])

   const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info)
   }, [])

   const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info)
   }, [])

   const registerUser = useCallback(async (e) => {
    e.preventDefault()
    
    setIsRegisterLoading(true)
    setRegisterError(null)
    const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
    )

    setIsRegisterLoading(false)

    if(response.error){
        return setRegisterError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
   }, [registerInfo])

   const loginUser = useCallback(async(e) => {
    e.preventDefault()
    
    setIsLoginLoading(true)
    setLoginError(null)

    const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
    )

    setIsLoginLoading(false)

    if(response.error){
        return setLoginError(response)
    }
    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)

   }, [loginInfo])

   const logoutUser = useCallback(() => {
    localStorage.removeItem("User")
    setUser(null)
   }, [])

    //console.log("localStorage User:", localStorage.getItem("User"));
    //console.log("Current User State:", user);


    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginUser,
                loginError,
                loginInfo,
                updateLoginInfo,
                isLoginLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
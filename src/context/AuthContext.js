import { createContext, useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { supabaseClient } from "../database/supabase/client"


export const AuthContext = createContext({
    user: null
})

export const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const navigate = useNavigate()

useEffect(() => {
    const authListener = supabaseClient.auth.onAuthStateChange(async ()=> checkUser())
    const checkUser = async ()=>{
        const user = await supabaseClient.auth.getUser()
        if(user.data.user != null) {
            setUser(user)
            console.log("DATA USER", user)
        }
        else{

        }
    }
return ()=>{
    authListener.subscription.unsubscribe()

}

},[])

return (

    <AuthContext.Provider value={{user}}>
         {children}
    </AuthContext.Provider>
  
    )
}
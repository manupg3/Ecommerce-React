import { useEffect, useState } from "react"
import { getUserProfile } from "../services/auth"


export const useProfile = () =>{

    console.log("USER PROFILE",getUserProfile())
    const [userName, setUserName] = useState(null)

    return  getUserProfile()

}
export default useProfile
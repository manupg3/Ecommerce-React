import { supabaseClient } from "../database/supabase/client"

export const signUpWithEmail = async (data) => {
  let result
  try {
    result = await supabaseClient.auth.signUp(data)
    return result
  } 
  catch (error) {
      console.log("ERROR SIGNUP",error)
  }
  return result
}
export const signInWithEmail = async (data) => {
    let result
    try {
      result = await supabaseClient.auth.signInWithPassword(data)
      return result
    } 
    catch (error) {
        console.log("ERROR SIGNUP",error)
    }
    return result
  }

export const updateProfile = async (data) =>{
try {
  await supabaseClient.from('profiles').upsert(data,{returning:'minimal'})
} catch (error) {
  console.log("ERROR UPDATE PROFILE",error)
}
}

export const getUserProfile =  async() =>{
    try{ 

     const user = await supabaseClient.auth.getUser()
     if(user){ 
         if(user.data.user == null){
            return "ES NULL"
        }
        else{     
            const{id,app_metadata,user_netadata}=user
            return {userEmail:user.data.user.email}
        }
        
    //     const{data,error,status}=await supabaseClient
    //       .from('profiles')
    //       .select('id,username,updated_at')
    //       .eq('id',id)
    //       .single()
    //       return{username:data.username}
         
      }
        
        }
         catch(error) {
            console.log("ERROR",error)
            return error
         }
      
          }

export const logOut = async() =>{

    let { error } = await supabaseClient.auth.signOut()
    console.log("ERROR",error)

}

import React,{useRef,useState,useContext,useEffect} from 'react'
import Page from '../../components/PageScrolling'
import { signUpWithEmail, updateProfile, signInWithEmail, logOut  } from '../../services/auth'
import useProfile from '../../hooks/useGetUserProfile';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from "../../database/supabase/client"
import AppContext from '../../context/AppContext';

const LoginAdmin = () => {
  const form = useRef()
  const refLogin = useRef()
  //const [LoggedUser, setLoggedUser] = useState(null)
  const profileUser = useProfile()
  const navigate = useNavigate()
  const { state, toggleSideCart, toggle, getProductsFromLocalStorage,SignIn,
    LoggedUser,setearProfile } = useContext(AppContext)


  const handleSignIn = async (e) => {
    e.preventDefault()
    const formData = new FormData(refLogin.current)
    const data = {
      email: formData.get('emailSignIn'),
      password: formData.get('passwordSignIn')
    }
    const result = await SignIn(data)
    console.log("IS SIGN IN",result)
       if(result == "Administrator"){
        console.log("ES ADMINNNNNNNNN")

       const res = setearProfile(result)
       console.log("RES",res)
        navigate("/admin-home")
       }
    // const result = await signInWithEmail(data)
    // let userProfile = await supabaseClient
    // .from('profiles')
    // .select('profile')
    // .eq("id", result.data.user.id);
    //  if(userProfile.data[0].profile == "Administrator"){
     
     
    //  }      

    //setLoggedUser(result.data.user.email)
    //localStorage.setItem("LoggedUser", result.data.user.email)
  }
  const handleLogOut = async () => {

    const result = await logOut()
    console.log("RESULT LOGOUT", result)
    setLoggedUser(null)
    localStorage.setItem("LoggedUser", null)

  }
  return (
    <div className='rounded-md ml-80 mr-80 mt-12 mb-12 shadow-lg'>
        <Page>
            
        <ul class="
  nav nav-tabs nav-justified
  flex flex-col
  md:flex-row
  flex-wrap
  list-none
  border-b-0
  pl-0
  mb-4
" id="tabs-tabJustify" role="tablist">
                      <li class="nav-item flex-grow text-center bg-blue-500" role="presentation">
                        <a href="#tabs-homeJustify" class="
      text-white
      w-full
      bg-blue-600
      block
      font-medium
      text-lg
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-0
      focus:border-transparent
    
    " id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
                          aria-controls="tabs-homeJustify" aria-selected="true">ADMIN LOGIN</a>
                      </li>
                    
                    </ul>
                    <div class="tab-content" id="tabs-tabContentJustify">
                      <div class="tab-pane fade show active" id="tabs-homeJustify" role="tabpanel"
                        aria-labelledby="tabs-home-tabJustify">
                        <div class="block p-4 rounded-lg bg-white">
                          <form ref={refLogin} onSubmit={handleSignIn}>
                            <div class="form-group mb-6">
                              <input type="email" class="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                name='emailSignIn'
                                id="exampleInputEmail2"
                                aria-describedby="emailHelp" placeholder="Enter email"
                              />
                            </div>
                            <div class="form-group mb-6">
                              <input type="password" class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleInputPassword2"
                                placeholder="Password"
                                name='passwordSignIn'
                              />
                            </div>
                            <div class="flex justify-between items-center mb-6">
                              <div class="form-group form-check">
                                <input type="checkbox"
                                  class="form-check-input appearance-none h-4 w-4 border border-gray-300
           rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
            transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left 
            mr-2 cursor-pointer"
                                  id="exampleCheck2" />
                                <label class="form-check-label inline-block text-gray-800" for="exampleCheck2">Remember me</label>
                              </div>
                              <a href="#!"
                                class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 
        ease-in-out">Forgot
                                password?</a>
                            </div>
                            <button type="submit" class="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" >Ingresar al Panel Administrador</button>
                            <p class="text-gray-800 mt-6 text-center">Not a member? <a href="#!"
                              class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</a>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                        <div class="block p-4 rounded-lg bg-white">
                
                        </div>
                      </div>

                    </div>

  
      </Page>
    </div>
  )
}

export default LoginAdmin
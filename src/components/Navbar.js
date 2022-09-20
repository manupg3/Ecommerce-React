import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React, { useState, useContext, useRef, useEffect } from 'react'
import { FiShoppingBag } from 'react-icons/fi';
import '../assets/css/stylesHeader.css'
import SideCart from './SideCart';
import '../assets/css/stylesSideCart.css'
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
import { Link } from 'react-router-dom';
import { supabaseClient } from '../database/supabase/client'
import ModalLoginRegister from './ModalLoginRegister';
import { signUpWithEmail, updateProfile, signInWithEmail, logOut } from '../services/auth'
import useProfile from '../hooks/useGetUserProfile';
import SearchBar from './SearchBar';
import Modal from 'react-bootstrap/Modal';
import { LinkContainer } from 'react-router-bootstrap'





function NavScrollExample() {

    const form = useRef()
    const refLogin = useRef()
    const [showDrop, setDropdown] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);
    const [LoggedUser, setLoggedUser] = useState(null)
    const [toggleSideCartState, setToggleSideCart] = useState(false)
    const { state, toggleSideCart, toggle, getProductsFromLocalStorage } = useContext(AppContext)
    const { cart } = state
    let productsFromLocal
    const [sideCartCount, setSideCartCount] = useState(0)
  
    useEffect(() => {
  
      productsFromLocal = getProductsFromLocalStorage()
      if(productsFromLocal){  
       if (productsFromLocal.length > 0) {
        console.log("DENTRO DEL IF",productsFromLocal.length)
        setSideCartCount(productsFromLocal.length)
        console.log("SIDECART COUNT", sideCartCount)
       }}
  
    }, [])
  
    useEffect(() => {
       
      if(sideCartCount > 0){
        console.log("ENTRO ACA")
        setSideCartCount(sideCartCount+1)
      }
      //  else{
      //    console.log("ENTROOOOOOOOO")
      //    setSideCartCount(state.cart.length)
      //  }
    }, [state])

    const showDropdown = (e)=>{
      console.log("ENTRO A SHOW DROPDOWN")
      setDropdown(!showDrop);
      console.log(showDrop)
  }
  const hideDropdown = e => {
      setDropdown(false);
  }
  
    const handleSideCart = (e) => {
      console.log("EVENT", e)
      //e.preventDefault()
      toggleSideCart()
    }
    const userEmail = useProfile()
    if (userEmail.email != undefined) {
      userEmail.then(email => {
        setLoggedUser(email.userEmail)
        localStorage.setItem("LoggedUser", email.userEmail)
      })
    }
  
    const isLggedIn = () => {
      if (localStorage.getItem("LoggedUser")) {
        const user = localStorage.getItem("LoggedUser")
        if (user == "null") {
          setLoggedUser(null)
        }
        else {
          setLoggedUser(localStorage.getItem("LoggedUser"))
        }
      }
      else {
  
      }
    }
    useEffect(() => {
      isLggedIn()
    }, [LoggedUser])
  
    const handleSignUp = async (e) => {
      e.preventDefault()
      const formData = new FormData(form.current)
      const data = {
        name: formData.get('nameSignUp'),
        lastName: formData.get('lastNameSignUp'),
        email: formData.get('emailSignUp'),
        password: formData.get('passwordSignUp')
      }
      const result = await signUpWithEmail(data)
      console.log("RESULT SIGN UP", result)
      if (result) {
        const user = await supabaseClient.auth.getUser()
        console.log("USER",user)
        const data2 = {
          id: user.data.user.id,
          full_name: data.name
        }
        setLoggedUser(user.email)
        console.log("USER STATE", LoggedUser)
  
        await updateProfile(data2)
      }
  
    }
  
    const handleSignIn = async (e) => {
      e.preventDefault()
      const formData = new FormData(refLogin.current)
      const data = {
        email: formData.get('emailSignIn'),
        password: formData.get('passwordSignIn')
      }
      const result = await signInWithEmail(data)
      console.log("USER RESULT", result.data)
      setLoggedUser(result.data.user.email)
      localStorage.setItem("LoggedUser", result.data.user.email)
    }
    const handleLogOut = async () => {
  
      const result = await logOut()
      console.log("RESULT LOGOUT", result)
      setLoggedUser(null)
      localStorage.setItem("LoggedUser", null)
  
    }
  
   


  return (
    
    <div className='fixed top-0 w-full z-50 shadow-md'>
    <Navbar bg="light" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ml-auto mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >     <LinkContainer to="/" className="block md:px-3">
                     <Nav.Link>Home</Nav.Link>
               </LinkContainer>   
               <LinkContainer to="/shop" className="block md:px-3 ">  
            <NavDropdown title="Shop" id="navbarScrollingDropdown" className="drop-menu-shop"
              show={showDrop}
              onMouseEnter={showDropdown} 
              onMouseLeave={hideDropdown}
            >
              <NavDropdown.Item href="#action3">
                Categoria 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Categoria 2
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Categoria 3
              </NavDropdown.Item>
            </NavDropdown>
            </LinkContainer>   
            <LinkContainer to="/about" className="block md:px-3">  
                     <Nav.Link >About</Nav.Link>
                     </LinkContainer>   
                     
            <LinkContainer to="/contact" className="block md:px-3">  
                     <Nav.Link >Contact</Nav.Link>
                     </LinkContainer>   
          </Nav>
          <ul className="border-t space-y-2  lg:space-y-0 
          lg:space-x-2 lg:pt-0 lg:pl-2 lg:border-t-0 lg:border-l 
          lg:items-center lg:flex mb-0">
                    <li>
                      {!LoggedUser &&
                        <button type="button" title="Start buying" className="w-full 
                                px-6 rounded-md text-center transition active:bg-sky-200 
                                focus:bg-sky-100 sm:w-max"
                           onClick={handleShowModal}
                           >
                           
                          <span className="block text-cyan-600 font-semibold">
                            Sign in / Log in
                          </span>
                        </button>
                        

                      }
                      {LoggedUser &&
                        <div className="dropdown-profile">{LoggedUser}
                          <ul className="dropdown-menu-profile shadow-lg" >
                            <li><a href="#">My Orders</a></li>
                            <li><button onClick={handleLogOut} >Log Out</button></li>
                          </ul>
                        </div>

                      }

                    </li>
                    <li className='mini-cart'>
                      <button type="button"
                        className="w-full  px-6 rounded-md text-center transition 
                                active:bg-sky-200 focus:bg-sky-100 sm:w-max"
                        onClick={() => handleSideCart()}
                      >
                        <FiShoppingBag style={{ fontSize: "25px" }} />
                      </button>
                 
                      {state.cart.length > 0 &&
                    
                        <div className="Header-alert">{state.cart.length}</div>
                      
                      }   
                 
                    </li>

                    <li>
                      <SearchBar />
                    </li>
                  </ul>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
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
                      <li class="nav-item flex-grow text-center" role="presentation">
                        <a href="#tabs-homeJustify" class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    " id="tabs-home-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-homeJustify" role="tab"
                          aria-controls="tabs-homeJustify" aria-selected="true">Log In</a>
                      </li>
                      <li class="nav-item flex-grow text-center" role="presentation">
                        <a href="#tabs-profileJustify" class="
      nav-link
      w-full
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    " id="tabs-profile-tabJustify" data-bs-toggle="pill" data-bs-target="#tabs-profileJustify" role="tab"
                          aria-controls="tabs-profileJustify" aria-selected="false">Register</a>
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
      ease-in-out" onClick={handleClose}>Sign in</button>
                            <p class="text-gray-800 mt-6 text-center">Not a member? <a href="#!"
                              class="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</a>
                            </p>
                          </form>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="tabs-profileJustify" role="tabpanel" aria-labelledby="tabs-profile-tabJustify">
                        <div class="block p-4 rounded-lg bg-white">
                          <form ref={form} onSubmit={handleSignUp}>
                            <div class="grid grid-cols-2 gap-4">
                              <div class="form-group mb-6">
                                <input type="text" class="form-control
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
                                  id="exampleInput123"
                                  name='nameSignUp'
                                  aria-describedby="emailHelp123" placeholder="First name" />
                              </div>
                              <div class="form-group mb-6">
                                <input type="text" class="form-control
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
                                  id="exampleInput124"
                                  name='lastNameSignUp'
                                  aria-describedby="emailHelp124" placeholder="Last name" />
                              </div>
                            </div>
                            <div class="form-group mb-6">
                              <input type="email" class="form-control block
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
                                id="exampleInput125"
                                name="emailSignUp"
                                placeholder="Email address" />
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
                                id="exampleInput126"
                                name='passwordSignUp'
                                placeholder="Password" />
                            </div>

                            <button class="
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
      ease-in-out" >Sign up</button>
                          </form>
                        </div>
                      </div>

                    </div>

        </Modal.Body>
    
      </Modal>
          {toggle &&
            <SideCart />
          }
    </div>
  );
}

export default NavScrollExample;
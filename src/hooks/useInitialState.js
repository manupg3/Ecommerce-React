import { prevButtonDisabled } from 'nuka-carousel/lib/default-controls';
import { useState, useEffect, Profiler } from 'react'
import SideCart from '../components/SideCart';
import initialState from '../InitialState';
import { supabaseClient } from '../database/supabase/client'
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
import { signUpWithEmail, updateProfile, signInWithEmail, logOut } from '../services/auth'
import { useNavigate } from 'react-router-dom';


const useInitialState = () => {
    
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(false)
    const [productsFlocal , setProducts] = useState()
    const [total, setTotal] = useState(0)
    const [applied, setApplied] = useState()
    const [LoggedUser, setLoggedUser] = useState(null)
    const [profile, setProfile] = useState(null)
  
    let productsFromLocal

    useEffect(() => {

         calculateTotal()
    
      }, [state])

    useEffect(() => {
        
        productsFromLocal = getProductsFromLocalStorage()

        if(productsFromLocal){
       
            state.cart = productsFromLocal
    }
      }, [])

      console.log("STATE CART",state)

      const SignIn = async (data) => {
        
        const result = await signInWithEmail(data)
        console.log("USER RESULT", result.data)
        setLoggedUser(result.data.user.email)
        localStorage.setItem("LoggedUser", result.data.user.email)
           let userProfile = await supabaseClient
            .from('profiles')
            .select('profile')
            .eq("id", result.data.user.id)

            if(userProfile.data[0].profile == "Administrator"){
                console.log("ENTRO AQUI")
                    return userProfile.data[0].profile                  
             }
             else{
                console.log("ES CLIENTE")
                return userProfile.data[0].profile
             } 
      }
      const setearProfile = (profileUser) =>{ 
        console.log("PROFILE USER ES:",profileUser)      
        setProfile("ADMIN")
        console.log("ES ADMIN?",profile)
        return profile
      }

     const addToCart = (payload) => {
       if(state.cart.length > 0){  
         const equal = state.cart.filter(item => item.id === payload.id)
         console.log("EQUAL",equal)
           if(equal.length > 0){
             Plus(payload)
           }
           else{
            setState({
                ...state,
                cart: [...state.cart, payload]
                })
           }
        }
        else{
    setState({
        ...state,
        cart: [...state.cart, payload]
        })}
    calculateTotal(payload)
       
}


    const getProductsFromLocalStorage = ( ) =>{
               if(localStorage.getItem("ProductsInCart")){

        const productFromLocalStorage = JSON.parse(localStorage.getItem("ProductsInCart"))
           
        return productFromLocalStorage
    }
    }

    const removeFromSideCart = (payload) =>{
        setApplied(false)
        state.cart.map(item =>{
            if(item.id === payload.id){
                item.quantity = 1
            }
        })
        localStorage.setItem("CouponApplied", false) 
        setState({
            ...state,
            cart: state.cart.filter(item => item.id !== payload.id)
        })
    }
    const toggleSideCart = () =>{
        setToggle(!toggle)
    }
    
    const insertOrder = async(order) =>{
        let productsIDs = ""        

        for (let index = 0; index < state.cart.length; index++) {
            productsIDs += state.cart[index].id+","
        }
       try {
       const result = await supabaseClient
        .from('order')
        .insert([
          { products: productsIDs.slice(0,-1), buyer: order.buyer, orderTotal: order.totalOrder },
        ])
          return result

       } catch (error) {
          console.log("ERROR",error)
       }               
    }

    const addToBuyer = (payload) =>{
        setState({
            ...state,
           buyer:[...state.buyer, payload]
        })
       
    }

    const calculateTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity
        const sumTotal = state.cart.reduce(reducer, 0)
        setTotal(sumTotal)
      }
    const updateTotalDiscount = (totalWithDiscount) => {
        setTotal(totalWithDiscount)
      }

     const applyCouponDiscount = (apply) =>{
        if(apply === true){
            setApplied(true)
        }
        else{
            console.log("CUPON INVALIDO")
        }
     } 
    const handleMinus = (product) =>{

        state.cart.map(item=>{
            if(item.id == product.id){
                if(item.quantity == 1){
                  
                }
                else{
                item.quantity = item.quantity-1
                calculateTotal()
               }
            }
          })
          localStorage.setItem("ProductsInCart",JSON.stringify(state.cart))    

    }
    const Plus = (product) =>{
          state.cart.map(item=>{
            if(item.id == product.id){
                item.quantity = item.quantity+1
                calculateTotal()
            }
          })
          localStorage.setItem("ProductsInCart",JSON.stringify(state.cart))    
    }

    return {
        state,
        toggle,
        productsFlocal,
        addToCart,
        removeFromSideCart,
        toggleSideCart,
        addToBuyer,
        insertOrder,
        setearProfile,
        handleMinus,
        applied,
        Plus,
        getProductsFromLocalStorage,
        total,
        updateTotalDiscount,
        applyCouponDiscount,
        SignIn,
        LoggedUser,
        profile,

    }
}
export default useInitialState
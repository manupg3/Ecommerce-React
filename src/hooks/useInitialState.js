import { prevButtonDisabled } from 'nuka-carousel/lib/default-controls';
import { useState, useEffect } from 'react'
import SideCart from '../components/SideCart';
import initialState from '../InitialState';
import { supabaseClient } from '../database/supabase/client'
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';



const useInitialState = () => {
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(false)
    const [productsFlocal , setProducts] = useState()
    const [total, setTotal] = useState(0)
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

    const addToCart = (payload) => {

        setState({
            ...state,
            cart: [...state.cart, payload]
        })
        calculateTotal(payload)
    }

    const getProductsFromLocalStorage = ( ) =>{
               if(localStorage.getItem("ProductsInCart")){

        const productFromLocalStorage = JSON.parse(localStorage.getItem("ProductsInCart"))
           
        return productFromLocalStorage
    }
    }

    const removeFromSideCart = (payload) =>{
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

    const handleMinus = (product) =>{

    }
    const Plus = (product) =>{

          state.cart.map(item=>{
            if(item.id == product.id){
                item.quantity = item.quantity+1
                calculateTotal()
            }
          })
        
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
        handleMinus,
        Plus,
        getProductsFromLocalStorage,
        total,
    }
}
export default useInitialState
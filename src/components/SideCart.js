import React, { useState, useContext,useEffect,useLayoutEffect } from 'react'
import OrderItem from '../components/OrderItem'
import AppContext from '../context/AppContext'
import { Link } from 'react-router-dom'
import '../assets/css/animatedButton.css'
import '../assets/css/stylesSideCart.css'
import {AiOutlineClose} from 'react-icons/ai'


function SideCart() {
  const { state, toggleSideCart, toggle,total, getProductsFromLocalStorage , productsFLocal} = useContext(AppContext)
  const { cart } = state
  let products
  useEffect(() => {
       
       console.log("STATE CART EN SIDECART",state.cart)

  }, [])
  

  useEffect(() => {
         
     if(state.cart.length > 0 ){
     localStorage.setItem("ProductsInCart",JSON.stringify(state.cart))    
    }
    else{
      localStorage.setItem("ProductsInCart",[])   

    }
    },[state])



  function CloseSideCart() {
    console.log("CLOSE")
    toggleSideCart()
    console.log("TOGGLE DESDE SIDECART", toggle)
  }

  return (
    <div >
      <aside class="product-detail shadow-lg z-50" >
        <div class="title-container">
          <p class="title">My order</p>
          <div className='close-sidebar'>
          <button onClick={() => CloseSideCart()} >   
          <AiOutlineClose />
          </button>
          </div>
        </div>
        {state.cart.length > 0 &&

          <div className="my-order-content pt-2">
            <div className='container-items'>
             
              {state.cart.map(product => (
                  <OrderItem product={product} key={`orderItem-${product.id}`} />              
              ))
              }</div>

            <div class="order">
              <p>
                <span>Total</span>
              </p>
              <p>${total}</p>
            </div>

            <div className="wrapper-button-sidecart text-center">
              <Link to="checkout" onClick={() => CloseSideCart()} className="font-button">
                <span>
                  Checkout
                </span>
              </Link>
            </div>

          </div>

        }
        {state.cart.length == 0 &&
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>
              There are no products in the cart
            </h1>
          </div>
        }
      </aside>
    </div>
  )
}

export default SideCart
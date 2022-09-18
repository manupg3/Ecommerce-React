import React,{useContext} from 'react'
import AppContext from '../context/AppContext'
import {AiFillCheckCircle} from 'react-icons/ai'

function SuccessPage() {

  const { state} = useContext(AppContext)
  state.cart = []
  console.log("STATE EN SUCCESS", state)

  return (
    <div> 
    <div className='text-center h-[300px] justify-center pt-36 pb-[300px] '>
    <AiFillCheckCircle className='mr-auto ml-auto text-[40px] text-green-500 '/>   
    <div className='pt-2 text-green-500 text-[50px] font-bold pb-2'>
      ORDER CONFIRMED
    </div>
    <p className='font-semibold '>
    Your order information was sent to your email
    </p>
    </div>
    </div>
  )
}

export default SuccessPage
import React, { useContext, useRef, useState,useEffect } from 'react'
import AppContext from '../context/AppContext'
import '../assets/css/checkout.css'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../components/PageScrolling'
import { signUpWithEmail, updateProfile, signInWithEmail, logOut } from '../services/auth'
import {AiFillCheckCircle} from 'react-icons/ai'
import { ThreeDots } from  'react-loader-spinner'



function CheckoutPage() {
const [total, setTotal] = useState(0)
const [applied, setApplied] = useState()
const [badCoupon, setBadCoupon] = useState(false)
const [loader , setLoader] = useState(false) 
const [actualCheckboxState, changeCheckboxState] = useState(false);
const [payment, setPaymentMethod] = useState("")
const {state,addToBuyer,toggleSideCart,insertOrder} = useContext(AppContext)
let {cart} = state
const form = useRef(null)
const refCoupon = useRef(null)

 let discount = 0
 const navigate = useNavigate()

 useEffect(() => {
  
  totalPayment()
  if(localStorage.getItem("CouponApplied")){
    setApplied(true)
    console.log("TOTAl",total)
    setTotal(localStorage.getItem("Total"))
  }

  else{

  }

}, [])


useEffect(() => {
  
totalPayment()

}, [total])



const totalPayment = (discount) => {

  let sumTotal = 0

  const reducer = (accumulator, currentValue) => accumulator + currentValue.price
  sumTotal = state.cart.reduce(reducer, 0)
  setTotal(sumTotal)
  if(discount > 0 ){
    
    let applyDiscount = (sumTotal*30)/100
    sumTotal = sumTotal - applyDiscount
    setTotal(sumTotal)
    localStorage.setItem("Total", sumTotal)

  }

}

const applyCoupon = (e) => {

  e.preventDefault()
  const formData = new FormData(refCoupon.current)
  if(formData.get('coupon') == "DISCOUNT-30%"){  
  discount = 30
  totalPayment(discount)
  setBadCoupon(false)
  setApplied(true) 
  localStorage.setItem("CouponApplied", true) 
 }
  else{
   setBadCoupon(true)
  }
}
const onChangeValue = (e) => {
  setPaymentMethod(e.target.value)

}
const handleSubmit = () =>{
  const formData = new FormData(form.current)
  console.log("DATOS FORM")
  console.log("CHECKBOX ELEGIDO",payment)
  const buyer = {
    'email': formData.get('email'),
    'address': formData.get('address'),
    'apto': formData.get('apto'),
    'city': formData.get('city'),
    'country': formData.get('country'),
    'state': formData.get('state'),
    'cp': formData.get('cp'),
    'phone': formData.get('phone'),
  }
  addToBuyer(buyer);
   
  const order = {
    buyer: buyer.email,
    totalOrder: total
  }
    setLoader(true)
    setTimeout(() => {
    setLoader(false)
    const result = insertOrder(order)
    result.then((value)=>{
     if(value.status === 201){
      setApplied("")
      setTotal(0)
      setPaymentMethod("")
      localStorage.setItem("CouponApplied", "")
      localStorage.setItem("Total", 0)
      cart = []
      navigate('/checkout-success')
     }
     else{
      navigate('/checkout')
     }    
    })

  }, 2000);

}
if(loader == false){ 
return (
  <Page>

<div className='flex ml-12 mr-8 shadow-md w-[35%] mt-24 pb-2 pt-4 pr-4'>
{!applied &&
<div className=''>
    <a class="inline-block px-6 py-2.5 bg-whit text-grey-500 
     text-[16px] font-semibold leading-tight rounded  
     focus:outline-none focus:ring-0 transition
      duration-150 ease-in-out pl-14 hover:underline" data-bs-toggle="collapse" href="#couponcode" 
      role="button" aria-expanded="false" aria-controls="couponcode">
     you have a discount coupon?
  </a>
  <form ref={refCoupon} onSubmit={applyCoupon}>
    <div  id="couponcode" className="collapse pl-12 ">
		<input type="text" name='coupon' className="    
        px-3
        mb-6
        py-1.5
        mr-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        focus:border-b-[2px]
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        placeholder="Enter Coupon Code" />
		<button type='submit'
    className="pt-[8px] pb-[8px] pl-[12px] pr-[12px] bg-white text-black 
    font-bold mt-4 mb-2 border-2 border-black hover:bg-black hover:text-white">Apply Coupon</button>
	</div>
  </form>
  </div>
 }{applied && 
<p class="flex gap-2 text-center inline-block px-6 py-2.5 bg-whit text-green-400 
     text-[16px] font-semibold leading-tight rounded  
     focus:outline-none focus:ring-0 transition
      duration-150 ease-in-out pl-14 ">
        Coupon applied successfully   <AiFillCheckCircle className=' text-green-400 text-lg' />
  </p>
  
 }
    {badCoupon && 
<p className='absolute left-[350px] bg-red-600 text-white font-bold text-[12px] 
   px-[10px] py-[5px] rounded-[3px] 
' >Codigo Incorrecto</p>
 }
	<div>
  </div>

    </div>  

    <div className='pt-2 pb-12 checkout-template'>
      <div class="block p-12 pb-8 rounded-lg shadow-lg bg-white w-[90%] ml-12">
      <h1 className='text-center mb-6 text-2xl uppercase font-bold'>Billing Information</h1>
  <form ref={form}>
    <div class="form-group mb-0">
    <div className='flex'>
    <input type="text" placeholder="Nombre completo" name="name" className="block
        w-full
        px-3
        mb-6
        py-1.5
        mr-4
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        focus:border-b-[2px]
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
            <input type="text" placeholder="Correo Electronico" name="email" className="block
        w-full
        px-3
        py-1.5
        focus:border-b-[2px]
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
         </div>
            <input type="text" placeholder="Direccion" name="address" className="block
        w-full
        px-3
        py-1.5
        mb-6
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        focus:border-b-[2px]
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
         <div className='flex'>
            <input type="text" placeholder="Apto" name="apto" className="block
        w-full
        px-3
        mr-4
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        focus:border-b-[2px]
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
            
            <input type="text" placeholder="Ciudad" name="city" className="block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        focus:border-b-[2px]
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
           </div> <div className='flex'>
            <input type="text" placeholder="Pais" name="country" className="block
        w-full
        px-3
        mr-4
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        ease-in-out
        focus:border-b-[2px]
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
          
             <input type="text" placeholder="Estado" name="state"  className="block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        ease-in-out
        mb-6
        focus:border-b-[2px]
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
          </div> <div className='flex'>
            <input type="text" placeholder="Codigo postal" name="cp"className="block
        w-full
        px-3
        focus:border-b-[2px]
        mr-4
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
        
            <input type="text" placeholder="Telefono" name="phone" className="block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        focus:border-b-[2px]
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b-[1px]
        transition
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
        </div>
</div>
  </form>
</div>
<div className="information-sidebar p-4 shadow-lg mr-[20px] ">
        <h3 className='mb-6 text-[23px] '>Your Order</h3>
        {cart.map((item) => (
          <div className="Information-item  " key={item.title}>
            <div className="Information-element flex text-center mb-[14px] ">
            <img src={item.image} height="15px" width="50px" 
            style={{marginRight:"10px"}} alt='' /><h4>{item.title}</h4>
              <div className='w-full'>
              <span className='float-right'>
                $
                {item.price}
              </span>
              </div>
            </div>
          </div>
        ))}
       <hr style={{width:"100%", border:"0.5px solid #7a7a7a",marginTop:"19px",marginBottom:"12px"}} />
       <div>
       <h3>Payment Method</h3>
       <div class="flex justify-start py-2">
  <div>
  <div onChange={onChangeValue}> 
    <div class="form-check">
      <input class="form-check-input appearance-none rounded-full 
      h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 
      checked:border-blue-600 focus:outline-none transition 
      duration-200 mt-1 align-top bg-no-repeat 
      bg-center bg-contain float-left mr-2 cursor-pointer"
       type="radio" name="checkbox" id="flexRadioDefault1" value="cash" />
      <label class="form-check-label font-semibold inline-block text-gray-800" for="flexRadioDefault1">
      cash
      </label>
    </div>
    <div class="form-check">
      <input class="form-check-input appearance-none 
      rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 
      checked:border-blue-600 focus:outline-none transition 
      duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 
      cursor-pointer" type="radio" name="checkbox" id="flexRadioDefault2" value="Paypal"/>
      <label class="form-check-label font-semibold inline-block text-gray-800" for="flexRadioDefault2">
        Payal
      </label>
    </div>
    </div>
  </div>
</div>
       </div>
       <hr style={{width:"100%", border:"0.5px solid #7a7a7a",marginTop:"8px",marginBottom:"12px"}} />
       
       <div className='flex mt-4'>
       <h3>Total:</h3>
       <div className='w-full'>  
       <span className='float-right'>
                ${total}</span>
              </div>
      </div>
      <div className='text-center'>
      <button className='pt-[10px] pb-[10px] pl-[15px] pr-[15px] bg-white text-black 
        font-bold mt-4 mb-2 border-2 border-black hover:bg-black hover:text-white' onClick={()=> handleSubmit()}>
        Proced to Payment
      </button>
      </div>
      </div>
    </div>
    

    </Page>
  )}
else{
return (
  <div className='text-center absolute w-full z-[10000000000] mt-[-20px] h-[500px] bg-white pt-[120px] '>
  <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{justifyContent:"center"}}
wrapperClassName=""
visible={true}
/></div>
)
}
}

export default CheckoutPage
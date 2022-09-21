import React, { useContext, useRef, useState,useEffect } from 'react'
import AppContext from '../context/AppContext'
import '../assets/css/checkout.css'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../components/PageScrolling'
import { signUpWithEmail, updateProfile, signInWithEmail, logOut } from '../services/auth'
import {AiFillCheckCircle} from 'react-icons/ai'
import { ThreeDots } from  'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function CheckoutPage() {
const [badCoupon, setBadCoupon] = useState(false)
const [loader , setLoader] = useState(false) 
const [actualCheckboxState, changeCheckboxState] = useState(false);
const [payment, setPaymentMethod] = useState("")
const {state,addToBuyer,toggleSideCart,updateTotalDiscount,insertOrder,
  total,applied,applyCouponDiscount} = useContext(AppContext)
let {cart} = state
const form = useRef(null)
const refCoupon = useRef(null)

 let discount = 0
 const navigate = useNavigate()

 useEffect(() => {
  console.log("ENTRO ACA")
  totalPayment()
  if(localStorage.getItem("CouponApplied")){
    const applied = localStorage.getItem("CouponApplied")
   if(applied === true){
    applyCouponDiscount(true)
    //setTotal(localStorage.getItem("Total"))
   }
   else{
    applyCouponDiscount(false)
   }
  }
  else{

  }

}, [])



useEffect(() => {
  
totalPayment()


}, [total])



const totalPayment = (discount) => {
  console.log("ENTRO ACA")
  let sumTotal = 0

  const reducer = (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity
  sumTotal = state.cart.reduce(reducer, 0)

  if(discount > 0 ){

    console.log("APLICAR DESUENTO")
    let applyDiscount = (sumTotal*30)/100
    sumTotal = sumTotal - applyDiscount
    console.log("SUMTOTAL CON DESCUENTO",sumTotal)
    updateTotalDiscount(sumTotal)
    console.log("TOTAL CON DESCUENTO",total)
    localStorage.setItem("Total", sumTotal)

  }

}
const MySwal = withReactContent(Swal)
const alertBadCoupon = ()=> {
 const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'error',
    title: 'invalid coupon'
  })
}
const applyCoupon = (e) => {
  e.preventDefault()
  const formData = new FormData(refCoupon.current)
  if(state.cart.length === 0)
  {
     
  }
  else if(formData.get('coupon') == "DISCOUNT-30%"){
  discount = 30
  totalPayment(discount)
  setBadCoupon(false)
  applyCouponDiscount(true) 
  localStorage.setItem("CouponApplied", true) 
}
  else{
    alertBadCoupon()
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
      applyCouponDiscount(false)
      //setTotal(0)
      setPaymentMethod("")
      localStorage.setItem("CouponApplied", false)
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

<div className='flex ml-12 mr-8 mb-2 shadow-md w-max mt-4 pb-2 pt-4 pr-4'>
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
        border-b
        focus:border-b-2
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
        placeholder="Enter Coupon Code" />
		<button type='submit'
    className="btn-checkout-page pt-2 pb-2 pl-4 pr-4 bg-white text-black 
    font-bold mt-4 mb-2 border-2 border-black">Apply Coupon</button>
	</div>
  </form>
  </div>
 }{applied && 
<p class="flex gap-2 text-center inline-block px-6 py-2.5 bg-whit text-green-400 
     text-[16px] font-semibold leading-tight rounded  
     focus:outline-none focus:ring-0 transition
      duration-150 ease-in-out pl-14 mb-0">
        Coupon applied successfully   <AiFillCheckCircle className=' text-green-400 text-lg' />
  </p>
  
 }
  
	<div>
  </div>

    </div>  

    <div className='pt-2 pb-12 checkout-template'>
      <div class="block p-12 pb-8 rounded-lg shadow-lg bg-white w-11/12 ml-12">
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
        border-b
        focus:border-b-2
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
            <input type="text" placeholder="Correo Electronico" name="email" className="block
        w-full
        px-3
        py-1.5
        focus:border-b
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b
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
        border-b
        transition
        focus:border-b-2
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
        border-b
        transition
        focus:border-b-2
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
        border-b
        transition
        focus:border-b-2
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
        border-b
        transition
        ease-in-out
        focus:border-b-2
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
        border-b
        transition
        ease-in-out
        mb-6
        focus:border-b-2
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
          </div> <div className='flex'>
            <input type="text" placeholder="Codigo postal" name="cp"className="block
        w-full
        px-3
        focus:border-b-2
        mr-4
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b
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
        focus:border-b-2
        bg-white bg-clip-padding
        border-t-0 border-solid border-gray-300
        border-b
        transition
        ease-in-out
        mb-6
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
        </div>
</div>
  </form>
</div>
<div className="information-sidebar p-4 shadow-lg mr-4 ">
        <h3 className='mb-6 text-lg '>Your Order</h3>
        {cart.map((item) => (
          <div className="Information-item " key={item.title}>
            <div className="Information-element flex text-center mb-4 ">
            <img src={item.image} height="15px" width="50px" 
            style={{marginRight:"10px"}} alt='' /><h4 className='mb-0 text-base'>{item.title}</h4>
            <p className='ml-1 mb-0'>x{item.quantity}</p>
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
       <h3 className='text-lg'>Payment Method</h3>
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
       <h3 className='text-lg'>Total:</h3>
       <div className='w-full'>  
       <span className='float-right'>
                ${total}</span>
              </div>
      </div>
      <div className='text-center'>
      <button className='pt-2 pb-2 pl-4 pr-4 bg-white text-black 
        font-bold mt-4 mb-2 border-2 border-black btn-checkout-page' onClick={()=> handleSubmit()}>
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
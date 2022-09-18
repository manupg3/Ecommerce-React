import React ,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import AppContext from '../context/AppContext'
import {AiOutlineCar, AiOutlineCheck, AiOutlineLoading3Quarters} from 'react-icons/ai'
import '../assets/css/animatedButton.css'
import {Link} from 'react-router-dom'
import Page from '../components/PageScrolling'

function ProductPage() {
const {addToCart} = useContext(AppContext)

const location = useLocation()
const [product, setProduct] = useState("")

  useEffect(() => {
    setProduct(location.state)
  }, [location])
  
const handleAddToCart = product =>{
  console.log("PRODUCT PAGE ",product)
  addToCart(product)
}

  return (
    <Page>
    <div className='grid lg:grid-cols-2 bg-white gap-4 pt-[100px] pb-24 md:grid-cols-1'>
    <div>
    <img src={product.image} alt="" className="lg:pl-8 lg:pr-8"/>
    <div className="flex gap-4 justify-center">
    <div className=' flex items-center mt-36 border-[0px] 
    border-black pl-[20px] pb-[20px] pr-[20px] pt-[20px] '>
    <AiOutlineCar />     
    <h1 className='pl-[5px] font-semibold text-lg mb-0 ml-2 '>Free Shipping</h1>
    
    </div>
    <div className=' flex items-center mt-36 border-[0px] border-black pl-[20px] pb-[20px] pr-[20px] pt-[20px] '>
    < AiOutlineCheck />     
    <h1 className='pl-[5px] font-semibold text-lg mb-0 ml-2'>Secure Payment</h1>
   </div>
    </div> 
    </div>
    <div className='pl-50px'>
    <div className='pt-8 text-[50px] font-bold '>
    <h1>
      {product.title}
    </h1>
    </div>
    <div className='pt-2'>
    <h1 className='text-[30px] font-semibold '>
      ${product.price}
    </h1>
    </div>
    <div className='pt-2'>
    <h1 className='text-lg'>
      {product.description}
    </h1>
    </div>
    <div className='mt-6'>
  
    <div className='container-button-p-page'>
                  <button className='' onClick={()=> handleAddToCart(product)}><span>ADD TO CART</span></button>
                </div>
   
    </div>  
    </div>   
     
    </div>
    <div className='pl-36 pr-36 pb-24'>
    <ul class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4" id="tabs-tabFill"
  role="tablist">
  <li class="nav-item flex-auto text-center" role="presentation">
    <a href="#tabs-homeFill" class="
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
    " id="tabs-home-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-homeFill" role="tab"
      aria-controls="tabs-homeFill" aria-selected="true">Description</a>
  </li>
  <li class="nav-item flex-auto text-center" role="presentation">
    <a href="#tabs-profileFill" class="
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
    " id="tabs-profile-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-profileFill" role="tab"
      aria-controls="tabs-profileFill" aria-selected="false">Aditional Information</a>
  </li>
  <li class="nav-item flex-auto text-center" role="presentation">
    <a href="#tabs-messagesFill" class="
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
    " id="tabs-messages-tabFill" data-bs-toggle="pill" data-bs-target="#tabs-messagesFill" role="tab"
      aria-controls="tabs-messagesFill" aria-selected="false">Reviews</a>
  </li>
</ul>
<div class="tab-content p-4" id="tabs-tabContentFill">
  <div class="tab-pane fade show active" id="tabs-homeFill" role="tabpanel" aria-labelledby="tabs-home-tabFill">
  lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum
</div>
  <div class="tab-pane fade" id="tabs-profileFill" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
  lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum
  </div>
  <div class="tab-pane fade" id="tabs-messagesFill" role="tabpanel" aria-labelledby="tabs-profile-tabFill">
  lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum
  </div>
</div>
</div>
    </Page>
  )
}

export default ProductPage
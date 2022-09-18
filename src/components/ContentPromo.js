import React from 'react'
import imgPromo from '../assets/img/imgPromo1.png'
import '../assets/css/containerPromo.css'

function ContentPromo() {
  return (
    <div>
        
<div class="py-8 pl-4 rounded-lg m-12 container-promo">  
  <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="space-y-6 md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-black font-bold md:text-5xl">OBTAIN A 30% OFF.</h2>
          <div class="space-y-4">
            <p class="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
          </div>
          <div className='container-button-p-page'>
                  <button className='' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
                    <span>GET DISCOUNT</span></button>
                </div>
        </div>
        <div class="md:5/12 lg:w-6/12">
          <img src={imgPromo} alt="image" loading="lazy" width="" height="" />
        </div>
      </div>
  </div>
</div>
<div class="modal fade fixed top-28 left-0 hidden w-full h-full outline-none overflow-x-hidden
 overflow-y-auto"
  id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
  aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog relative w-auto pointer-events-none">
    <div
      class="modal-content border-none shadow-lg relative flex flex-col w-full 
      pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div
        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b
         border-gray-200 rounded-t-md">
        <h5 class="text-[20px] font-bold leading-normal text-gray-800" id="exampleModalLabel">
        Use this code at checkout
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-2">
      <div className='text-center py-2'>
      <h1 className='text-[20px] font-semibold '>  DISCOUNT-30%
         </h1>
        </div>
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button"
          class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">Understood</button>
     
      </div>
    </div>
  </div>
</div>
                      

    </div>
  )
}

export default ContentPromo
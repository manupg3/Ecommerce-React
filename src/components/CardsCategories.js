import React from 'react'
import '../assets/css/cardsCategories.css'
import Cat1 from '../assets/img/Categoria1.png'
import Cat2 from '../assets/img/Categoria2.png'
import Cat3 from '../assets/img/Categoria3.png'

function CardsCategories() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-0 pb-0'>
       <div class="card-categories shadow-lg">
    <div class="image">
      <img src={Cat1} />
    </div>
    <div class="details">
      <div class="center">
        <h1 className='font-semibold ' >RUNNING SHOES<br/></h1>
      </div>
    </div>
  </div>
  <div class="card-categories">
    <div class="image">
      <img src={Cat2} />
    </div>
    <div class="details">
      <div class="center">
        <h1 className='font-semibold' >BEST PRODUCTS<br/></h1>
 
      </div>
    </div>
  </div>
  <div class="card-categories">
    <div class="image">
      <img src={Cat3} />
    </div>
    <div class="details">
      <div class="center">
        <h1 className='font-semibold'>NEW COLLECTION<br/></h1>
   
      </div>
    </div>
  </div>
    </div>
  )
}

export default CardsCategories
import React,{useContext} from 'react'
import '../assets/css/home.scss'
import AppContext from '../context/AppContext';
import '../assets/css/styleAddToCart.css'
import {AiOutlineShopping} from 'react-icons/ai'
import {Link} from 'react-router-dom'

function Products() {
  const { state, addToCart, toggleSideCart } = useContext(AppContext);
  const { products } = state;

  const handleAddToCart = product => {
    console.log("product",product)
    addToCart(product)
  }

  return (
    <div style={{display:"flex", paddingBottom:"5%",paddingTop:"2%", paddingLeft:"5%",paddingRight:"5%",  flexWrap: "wrap", 
    justifyContent:"space-evenly", alignItems:"center",  gap:"50px 0px"}}>
        {products.map( product =>

        <div key={product.id}>
<div className="glassBox">
  <div className="glassBox__imgBox">
  <Link to="/product-page" state={product} >
    <img src={product.image} alt=""/>
    <h3 className="glassBox__title">{product.title} </h3>
    </Link>
  </div>
  <h3 className='glassBox__price'>${product.price}</h3>
  <div className="glassBox__content" >{product.description}</div>
 
  <button className="glassBox__button " onClick={()=> handleAddToCart(product)}>ADD TO CART</button>  

</div>

</div>)}
    </div>
  )
}

export default Products
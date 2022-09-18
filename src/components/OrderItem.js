import React, {useContext} from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import '../assets/css/orderItem.css'
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const OrderItem = ({product}) => {
	const {removeFromSideCart,toggleSideCart,handleMinus,Plus} = useContext(AppContext)
    const handleRemove = product =>{
		removeFromSideCart(product)
	}
	const handlePlus = product =>{
		console.log("HANDLE PLUS")
          Plus(product)
	}
	
	return (
		<div className="OrderItem">
			<figure>
				<img src={product.image} alt="bike" />
			</figure>
			<div className='block'>
			<Link to="/product-page" state={product} onClick={() => toggleSideCart()} >
			<p className='mb-2 mt-8'>{product.title}</p>
			</Link>
			<div className='border-2 w-max'>
			<button className='pt-0 pl-2 pr-2' onClick={()=>handleMinus(product)}>-</button>
			<button  className='pt-0 pl-2 pr-2' onClick={()=>handlePlus(product)} >+</button>
			</div>
			</div>
			<p className='mb-0'>${product.price} </p>
			<AiOutlineDelete onClick={()=> handleRemove(product)} className="remove-item"/>
		</div>
	);
}

export default OrderItem;
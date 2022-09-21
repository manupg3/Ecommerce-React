import React,{useState,useEffect,useContext} from 'react'
import '../assets/css/stylesSearchBar.css'
import AppContext from '../context/AppContext'
import {Link} from 'react-router-dom'

function SearchBar() {
const {state} = useContext(AppContext)
const {products} = state
const [search, setSearch] = useState("")
const [stateResult,setStateResult] = useState(false)

const handleSearch = (event) =>{
   setSearch(event.target.value)
   console.log("EVENT TARGET",event.target.value.length)
   if(event.target.value.length > 1){
    setStateResult(true)
   }
   else{
    setStateResult(false)
   }
}
const filteredProducts = products.filter((product)=>{
   return product.title.toLowerCase().includes(search.toLocaleLowerCase())

})
console.log("PRODUCTO FILTADO",filteredProducts)

const closeResult = () =>{
  setStateResult(false)
  setSearch("")

}

  return (
    <div>
                  <div action="" class="search-bar">
	<input type="search" name="search" pattern=".*\S.*"  required 
     value={search} onChange={handleSearch}
    />
	<button class="search-btn w-full" type="submit">
		<span>Search</span>
	</button>
    {stateResult &&
    <div className='result-search'>
    {filteredProducts.map(product =>(
       <Link to="/product-page" state={product}  onClick={()=> closeResult()} >
        <div className='flex justify-between items-center'>
        <h1>{product.title}</h1>
        <img src={product.image} height="20px" width="50px" />        
       </div>
    			</Link>
    ))}
      {filteredProducts.length === 0 && 
     <p className='mb-0'>Products not found</p> 
      }
      </div>
     }
     
 
</div>
    </div>
  )
}

export default SearchBar
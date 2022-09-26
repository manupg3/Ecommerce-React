import React from 'react'
import { FiAirplay,FiArchive, FiBarChart, FiClipboard, FiList } from 'react-icons/fi';
import { LinkContainer } from 'react-router-bootstrap'
import '../adminCss/asideStyles.css'
export const AdminAside = () => {
  return (
    <div 
     >
        <aside className='w-52 pr-10 bg-indigo-500 border-black'>
      <ul className='pt-4 pl-4'><LinkContainer to="/admin-home" className=" block md:px-3">
             <div className='li-active text-white li-hover pb-4 pt-2 s text-md
              flex items-center cursor-pointer'>
                      <FiAirplay style={{
       fontSize: "20px",marginRight:"7px" }} />
Panel</div>
               </LinkContainer>   
                   <LinkContainer to="/admin-products-page" className="block md:px-3">
                   <li className='li-hover li-active text-white pb-4  text-md flex items-center cursor-pointer'>
                    <FiArchive style={{
       fontSize: "20px",marginRight:"7px" }} />Products</li>
               </LinkContainer>   
               <LinkContainer to="/orders-page" className="block md:px-3">
      <li className='li-hover li-active pb-4 text-white text-md flex items-center cursor-pointer'><FiClipboard style={{
       fontSize: "20px",marginRight:"7px" }} />Orders</li>
               </LinkContainer>   
               <LinkContainer to="/analityc-page" className="block md:px-3">
      <li className='li-hover li-active pb-4 text-white text-md flex items-center cursor-pointer'><FiBarChart style={{
       fontSize: "20px",marginRight:"7px" }} />Analitycs</li>
                     </LinkContainer>   
                     <LinkContainer to="/tasks-page" className="block md:px-3">
      <li className='li-hover li-active pb-4 text-white text-md flex
       items-center cursor-pointer'><FiList style={{
       fontSize: "20px",marginRight:"7px" }} />Tasks</li>
                     </LinkContainer>          

      </ul>
      </aside>

    </div>
  )
}

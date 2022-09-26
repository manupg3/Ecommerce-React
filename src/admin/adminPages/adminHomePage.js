import React from 'react'
import { FiAirplay,FiArchive, FiBarChart, FiClipboard, FiDollarSign } from 'react-icons/fi';
import { LinkContainer } from 'react-router-bootstrap'
import { FaDollarSign,FaCalendarAlt,FaClipboardList,FaTasks, FaDownload} from 'react-icons/fa';
import  '../adminCss/adminHomePageStyles.css'

import { AdminAside } from '../adminComponentes/AdminAside';
import  {AdminCards}  from '../adminComponentes/AdminCards';

const AdminHomePage = () => {
 const cardsDataStyles = "shadow-md rounded-md mt-4 mb-4 ml-2 mr-2 pl-2 pb-4 pt-4 pr-2 border-l-4 border-indigo-500" 
 const contentCards = [
  {
    'title':"Monthly Earnings",
    'subtitle':"$50,000",
    'icon':<FaCalendarAlt />
  },
  {
      'title':"Yearly Earnings",
      'subtitle':"$900,0000",
      'icon':<FaDollarSign /> 
    },
    {
      'title':"Pending Tasks",
      'subtitle':"4",
      'icon':<FaTasks /> 
    },
    {
      'title':"Pending Orders",
      'subtitle':"5",
      'icon':<FaClipboardList />   
    },
]

  return (
    <div>
      <div  className='flex'>
      <AdminAside />  
      <div className='w-full'>   
      <div className='flex'><p className='mb-2 mt-6 ml-6 text-3xl  text-gray-500'>
        Dashboard</p>
      <button className='btn-generate-button shadow-md flex items-center position-absolute
       right-8 bg-indigo-500 hover:bg-indigo-600 text-white 
       rounded-md '><FaDownload className='mr-2'/>Generate Report</button></div>
    <div  className='flex'>
     <div className='w-full h-max grid grid-rows-2 grid-flow-col gap-4'>
      <div className=''>
       <div className='grid grid-cols-4 gap-2 pl-4 pr-4'>
        {contentCards.map(content=>
       <AdminCards iconCard={content.icon} titleCard={content.title} subtitleCard={content.subtitle} stylesCard={cardsDataStyles} />  
       )}
         </div>
      </div>
       <div className='grid grid-cols-2 gap-3'>
         Row 2
      </div>  
      </div>

      </div>
      </div>
      </div>
    </div>
  )
}

export default AdminHomePage
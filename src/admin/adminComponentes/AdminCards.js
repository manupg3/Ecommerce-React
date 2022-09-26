import React from 'react'


export const AdminCards = ({stylesCard,titleCard,subtitleCard,iconCard}) => {
     const title = titleCard
     const subtitle = subtitleCard
     const icon = iconCard
     console.log("ICON CARD DOLLAR",iconCard)

  return (
    <div>
        <div className={stylesCard}>
        <div className='justify-around flex items-center'>  
        <div className='block'>
        <div className='font-semibold'>{title}</div>
        <div className='font-bold text-lg'>{subtitle}</div>    
        </div>
        <div className=' text-2xl text-gray-400 '>{icon}</div>
        </div> 
        </div>
       
    </div>
  )
}

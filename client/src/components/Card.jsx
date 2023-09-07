import React from 'react'


import { download } from '../assets'
import { downloadImg } from "../utils"
const Card = ({_id,name,photo,description}) => {
  return (
    <div className='rounded-xl group h-fit relative shadow-card hover:shadow-cardhover card'>
      <img className='w-full  object-cover rounded-xl' src={photo} alt={description}/>
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#4ab15f49] p-4 rounded-md'>
        <p className=' text-white overflow-auto prompt text-md'>{description}</p>
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className='w-7 h-7 rounded-full object-cover bg-purple-700 items-center flex justify-center text-white text-lg font-bold'>
            {name[0]}
            </div>
            <p className='text-white text-md'>{name}</p>
          </div>
          <button type='button' onClick={() => downloadImg(_id,photo) } className='outline-none bg-transparent border-none'>
            <img src={download} alt='download' className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default Card
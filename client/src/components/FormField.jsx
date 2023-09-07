import React from 'react'

const FormField = ({ LabelName,type,name,placeholder,value,handleChange}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label htmlFor={name} className='block float-right ml-auto text-xl font-medium text-gray-900'>{LabelName}</label>
      </div>
      <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required
      className='bg-gray-50 max-sm:text-sm max-sm:p-3 text-right float-right placeholder:text-right w-full border-gray-300 border p-2 text-gray-900 text-md rounded-lg  focus:ring-[#486E52] focus:border-[#486E52]'
      />
    </div>
  )
}

export default FormField
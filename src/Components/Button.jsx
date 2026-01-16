import React from 'react'

const Button = ({ text, color }) => {
  return (
    <button 
    className={`py-2 px-4 bg-[#444] rounded-md text-white hover:scale-105 active:scale-95 duration-100 cursor-pointer`}
    style={{backgroundColor:color}}
    >
      {text}
    </button>
  )
}

export default Button

import React from 'react'

const Button = ({ text }) => {
  return (
    <button className='py-2 px-4 bg-[#444] rounded-md text-white'>
      {text}
    </button>
  )
}

export default Button

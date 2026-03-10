import React, { useContext } from 'react'
import { ResetFilterContextData } from '../Context/ResetFilterContext'

const Button = ({ text, color }) => {

  const { resetBtn, setResetBtn, resetFilters } = useContext(ResetFilterContextData)

  return (
    <button 
    className={`py-2 px-4 bg-[#444] rounded-md text-white hover:scale-105 active:scale-95 duration-100 cursor-pointer`}
    style={{backgroundColor:color}}
    onClick={() => {
      if(text !== "Reset") return;
      resetFilters()
      setResetBtn(false)
    }}
    >
      {text}
    </button>
  )
}

export default Button

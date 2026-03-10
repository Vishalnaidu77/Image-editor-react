import React, { useContext } from 'react'
import { ResetFilterContextData } from '../Context/ResetFilterContext'

const Button = ({ text, color, onClick }) => {

  const { resetBtn, setResetBtn, resetFilters } = useContext(ResetFilterContextData)

  const handleClick = () => {
    if(text === "Reset"){
      resetFilters()
      setResetBtn(false)
      return
    }
    if (onClick) onClick()
  };

  return (
    <button 
    className={`py-2 px-4 bg-[#444] rounded-md text-white hover:scale-105 active:scale-95 duration-100 cursor-pointer`}
    style={{backgroundColor:color}}
    onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default Button

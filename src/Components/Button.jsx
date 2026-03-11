import React, { memo, useCallback, useContext } from 'react'
import { ResetFilterContextData } from '../Context/ResetFilterContext'

const Button = memo(({ text, color, onClick, resetFilters: isResetButton }) => {
  const { resetFilters } = useContext(ResetFilterContextData)

  const handleClick = useCallback(() => {
    if (isResetButton) {
      resetFilters()
      return
    }
    if (onClick) onClick()
  }, [isResetButton, resetFilters, onClick])

  return (
    <button
      className='py-2 px-4 bg-[#444] rounded-md text-white hover:scale-105 active:scale-95 duration-100 cursor-pointer'
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {text}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

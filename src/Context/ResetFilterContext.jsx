import React, { Children, createContext, useContext, useEffect, useState } from 'react'
import { filterDataContext } from './FilterContext'

export const ResetFilterContextData = createContext()

const ResetFilterContext = ({ children }) => {

  const [resetBtn, setResetBtn] = useState(false)
  const { setFilters } = useContext(filterDataContext)

    const resetFilters = () => {
      const newFilters = {
        Brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        Saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        HueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        Blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        GrayScale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        Sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        Opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        Invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
      }

      setFilters(newFilters)
    }

  return (
    <ResetFilterContextData.Provider value={{ resetBtn, setResetBtn, resetFilters }}>
      {children}
    </ResetFilterContextData.Provider>
  )
}

export default ResetFilterContext

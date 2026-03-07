import React, { createContext, useState } from 'react'

export const filterDataContext = createContext()

const FilterContext = ({ children }) => {

    const [filters, setFilters] = useState({
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
  })

  return (
    <filterDataContext.Provider value={{ filters, setFilters }}>
        {children}
    </filterDataContext.Provider>
  )
}

export default FilterContext

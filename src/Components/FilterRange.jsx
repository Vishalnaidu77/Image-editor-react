import React, { useState } from 'react'

const FilterRange = ({ filterName, value, min, max, unit, filters, setFilters }) => {
  return (
    <label className='flex flex-col gap-2 text-md font-medium'>
        {filterName}
        <input 
            className='filter-range'
            type="range" 
            min={min}
            max={max} 
            value={value}
            onChange={(e) => {
              setFilters({
                ...filters,
                [filterName]: {
                  ...filters[filterName],
                  value: e.target.value
                }
              })
            }}
        />
    </label>
  )
}

export default FilterRange

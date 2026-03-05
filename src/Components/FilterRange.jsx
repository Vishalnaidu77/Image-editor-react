import React, { useState } from 'react'

const FilterRange = ({ filterName, value, min, max, unit, filters, setFilters }) => {
  console.log(min, max, value);
  return (
    <label className='flex flex-col'>
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

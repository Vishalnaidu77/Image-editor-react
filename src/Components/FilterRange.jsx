import React, { memo, useCallback, useContext } from 'react'
import { filterDataContext } from '../Context/FilterContext'

const FilterRange = memo(({ filterName, value, min, max }) => {
  const { updateFilter } = useContext(filterDataContext)

  // Memoized change handler - uses the optimized updateFilter from context
  const handleChange = useCallback((e) => {
    updateFilter(filterName, e.target.value)
  }, [filterName, updateFilter])

  return (
    <label className='flex flex-col gap-2 text-md font-medium'>
      {filterName}
      <input
        className='filter-range'
        type='range'
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </label>
  )
})

FilterRange.displayName = 'FilterRange'

export default FilterRange

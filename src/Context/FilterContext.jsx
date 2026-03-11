import React, { createContext, useState, useMemo, useCallback } from 'react'
import { getDefaultFilters } from '../constants/filterDefaults'

export const filterDataContext = createContext()

const FilterContext = ({ children }) => {
  const [filters, setFilters] = useState(getDefaultFilters)

  // Memoized update function for individual filter changes
  const updateFilter = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: {
        ...prev[filterName],
        value: Number(value)
      }
    }))
  }, [])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    filters,
    setFilters,
    updateFilter
  }), [filters, updateFilter])

  return (
    <filterDataContext.Provider value={contextValue}>
      {children}
    </filterDataContext.Provider>
  )
}

export default FilterContext

import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { filterDataContext } from './FilterContext'
import { getDefaultFilters } from '../constants/filterDefaults'

export const ResetFilterContextData = createContext()

const ResetFilterContext = ({ children }) => {
  const { setFilters } = useContext(filterDataContext)

  // Memoized reset function
  const resetFilters = useCallback(() => {
    setFilters(getDefaultFilters())
  }, [setFilters])

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    resetFilters
  }), [resetFilters])

  return (
    <ResetFilterContextData.Provider value={contextValue}>
      {children}
    </ResetFilterContextData.Provider>
  )
}

export default ResetFilterContext

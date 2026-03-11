import React, { memo, useCallback, useContext, useEffect, useState } from 'react'
import { filterDataContext } from '../Context/FilterContext'
import { PRESET_OPTIONS, applyPresetToFilters } from '../constants/filterDefaults'

const PresetOptions = memo(() => {
  const { setFilters } = useContext(filterDataContext)
  const [selectedPreset, setSelectedPreset] = useState('Normal')

  const handlePresetChange = useCallback((e) => {
    setSelectedPreset(e.target.value)
  }, [])

  // Apply preset when selection changes
  useEffect(() => {
    const newFilters = applyPresetToFilters(selectedPreset)
    setFilters(newFilters)
  }, [selectedPreset, setFilters])

  return (
    <select
      name='preset-options'
      id='preset-options'
      value={selectedPreset}
      onChange={handlePresetChange}
      className='w-full bg-[#fefefe] text-black py-2 px-3 mt-4 rounded font-semibold tracking-wider'
    >
      {PRESET_OPTIONS.map((preset) => (
        <option key={preset} value={preset}>
          {preset}
        </option>
      ))}
    </select>
  )
})

PresetOptions.displayName = 'PresetOptions'

export default PresetOptions

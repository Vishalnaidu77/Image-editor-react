import React, { useContext, useEffect, useState } from 'react'
import { filterDataContext } from '../Context/FilterContext'

const PresetOptions = () => {

    const { setFilters } = useContext(filterDataContext)
    const presetsOption = ['Normal', 'Drama', 'Vintage', 'OldSchool', 'Noir', 'CoolBlue', 'WarmSunset', 'HighKey']
    const [selectedPreset, setSelectedPreset] = useState('Normal')

    const handlePresets = (presetName) => {
        const presets = {
            Normal: {
                Brightness: 100,
                Contrast: 100,
                Saturation: 100,
                HueRotation: 0,
                Blur: 0,
                GrayScale: 0,
                Sepia: 0,
                Opacity: 100,
                Invert: 0,
            },
            Drama: {
                Brightness: 95,
                Contrast: 165,
                Saturation: 120,
                HueRotation: 0,
                Blur: 0,
                GrayScale: 20,
                Sepia: 10,
                Opacity: 100,
                Invert: 0,
            },
            Vintage: {
                Brightness: 110,
                Contrast: 90,
                Saturation: 75,
                HueRotation: 15,
                Blur: 1,
                GrayScale: 15,
                Sepia: 45,
                Opacity: 100,
                Invert: 0,
            },
            OldSchool: {
                Brightness: 105,
                Contrast: 85,
                Saturation: 55,
                HueRotation: 8,
                Blur: 0,
                GrayScale: 30,
                Sepia: 65,
                Opacity: 100,
                Invert: 0,
            },
            Noir: {
                Brightness: 95,
                Contrast: 140,
                Saturation: 0,
                HueRotation: 0,
                Blur: 0,
                GrayScale: 100,
                Sepia: 0,
                Opacity: 100,
                Invert: 0,
            },
            CoolBlue: {
                Brightness: 102,
                Contrast: 110,
                Saturation: 120,
                HueRotation: 25,
                Blur: 0,
                GrayScale: 0,
                Sepia: 0,
                Opacity: 100,
                Invert: 0,
            },
            WarmSunset: {
                Brightness: 112,
                Contrast: 108,
                Saturation: 130,
                HueRotation: 340,
                Blur: 0,
                GrayScale: 0,
                Sepia: 20,
                Opacity: 100,
                Invert: 0,
            },
            HighKey: {
                Brightness: 125,
                Contrast: 85,
                Saturation: 110,
                HueRotation: 0,
                Blur: 0,
                GrayScale: 5,
                Sepia: 0,
                Opacity: 100,
                Invert: 0,
            },
        }

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

        Object.keys(newFilters).forEach((newFilter) => {
            newFilters[newFilter].value = presets[presetName][newFilter]
        })

        setFilters(newFilters)
    }

    useEffect(() => {
        handlePresets(selectedPreset)
    }, [selectedPreset])

    

  return (
    <select 
    name="preset-options" 
    id="preset-options" 
    value={selectedPreset}
    onChange={(e) => setSelectedPreset(e.target.value)}
    className='w-full bg-[#fefefe] text-black py-2 px-3 mt-4 rounded font-semibold tracking-wider'
    >
        {presetsOption.map((presets, idx) => {
            return <option key={idx} value={presets}>{presets}</option>
        })}
    </select>
  )
}

export default PresetOptions

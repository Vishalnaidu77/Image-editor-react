// Default filter configuration - shared across all components
export const DEFAULT_FILTERS = Object.freeze({
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

// Helper to create a fresh copy of default filters
export const getDefaultFilters = () => JSON.parse(JSON.stringify(DEFAULT_FILTERS))

// Preset filter configurations - defined once, reused everywhere
export const PRESETS = Object.freeze({
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
})

export const PRESET_OPTIONS = Object.keys(PRESETS)

// Build filter CSS string - memoization helper
export const buildFilterString = (filters) => {
  return `brightness(${filters.Brightness.value}${filters.Brightness.unit}) contrast(${filters.Contrast.value}${filters.Contrast.unit}) saturate(${filters.Saturation.value}${filters.Saturation.unit}) hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit}) blur(${filters.Blur.value}${filters.Blur.unit}) grayscale(${filters.GrayScale.value}${filters.GrayScale.unit}) sepia(${filters.Sepia.value}${filters.Sepia.unit}) opacity(${filters.Opacity.value}${filters.Opacity.unit}) invert(${filters.Invert.value}${filters.Invert.unit})`
}

// Apply preset to filters object
export const applyPresetToFilters = (presetName) => {
  const baseFilters = getDefaultFilters()
  const preset = PRESETS[presetName]
  
  if (!preset) return baseFilters
  
  Object.keys(baseFilters).forEach((filterKey) => {
    baseFilters[filterKey].value = preset[filterKey]
  })
  
  return baseFilters
}

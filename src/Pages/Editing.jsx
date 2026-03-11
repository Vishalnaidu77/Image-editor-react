import React, { memo, useCallback, useContext, useMemo, useRef, useState, useTransition } from 'react'
import Button from '../Components/Button'
import FilterRange from '../Components/FilterRange'
import Canvas from '../Components/Canvas'
import { filterDataContext } from '../Context/FilterContext'
import PresetOptions from '../Components/PresetOptions'
import { buildFilterString } from '../constants/filterDefaults'

const MAX_PREVIEW_PIXELS = 2_000_000

// Memoized filter list component to prevent re-renders
const FilterList = memo(({ filters }) => {
  const filterKeys = useMemo(() => Object.keys(filters), [filters])
  
  return (
    <div className='filters p-5 flex flex-col gap-7'>
      {filterKeys.map((filter) => (
        <FilterRange
          key={filter}
          filterName={filter}
          min={filters[filter].min}
          max={filters[filter].max}
          value={filters[filter].value}
        />
      ))}
    </div>
  )
})

FilterList.displayName = 'FilterList'

// Memoized placeholder component
const ImagePlaceholder = memo(() => (
  <div className='placeholder'>
    <svg className='h-72' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor'>
      <path d='M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z' />
    </svg>
    <p className='text-lg'>No image is chosen</p>
  </div>
))

ImagePlaceholder.displayName = 'ImagePlaceholder'

const Editing = () => {
  const { filters } = useContext(filterDataContext)

  const [img, setImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canvasElem, setCanvasElem] = useState(null)
  const fileRef = useRef(null)
  const [isPending, startTransition] = useTransition()

  // Memoize filter style string for export
  const filterStyle = useMemo(() => buildFilterString(filters), [filters])

  // Memoized file handler with loading state
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsLoading(true)

    try {
      // Close previous bitmap to free memory
      if (img) {
        img.close()
      }
      fileRef.current = file

      const fullBitmap = await createImageBitmap(file)
      const pixels = fullBitmap.width * fullBitmap.height

      let finalBitmap
      if (pixels <= MAX_PREVIEW_PIXELS) {
        finalBitmap = fullBitmap
      } else {
        const scale = Math.sqrt(MAX_PREVIEW_PIXELS / pixels)
        finalBitmap = await createImageBitmap(file, {
          resizeWidth: Math.round(fullBitmap.width * scale),
          resizeHeight: Math.round(fullBitmap.height * scale),
          resizeQuality: 'medium',
        })
        fullBitmap.close()
      }

      // Use transition for smooth UI update
      startTransition(() => {
        setImg(finalBitmap)
      })
    } catch (error) {
      console.error('Error loading image:', error)
    } finally {
      setIsLoading(false)
    }
  }, [img])

  // Memoized download handler
  const handleDownload = useCallback(async () => {
    if (!fileRef.current) return

    try {
      const fullBitmap = await createImageBitmap(fileRef.current)

      const exportCanvas = document.createElement('canvas')
      exportCanvas.width = fullBitmap.width
      exportCanvas.height = fullBitmap.height

      const exportCtx = exportCanvas.getContext('2d', { alpha: false })
      if (!exportCtx) {
        fullBitmap.close()
        return
      }

      exportCtx.filter = filterStyle
      exportCtx.drawImage(fullBitmap, 0, 0)
      exportCtx.filter = 'none'
      fullBitmap.close()

      const blob = await new Promise((resolve) =>
        exportCanvas.toBlob(resolve, 'image/png', 1)
      )

      if (!blob) return

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'edited-image.png'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading image:', error)
    }
  }, [filterStyle])

  // Stable callback for canvas ready
  const handleCanvasReady = useCallback((canvas) => {
    setCanvasElem(canvas)
  }, [])

  return (
    <main>
      <section className='py-4 px-10 flex gap-4'>
        <div className='left w-[70%] flex flex-col gap-8 items-center'>
          <div className='top flex justify-center gap-10 items-center'>
            <label
              htmlFor='image-input'
              className='py-2 px-4 bg-[#eee] text-[#222] rounded-md cursor-pointer hover:bg-[#ddd] transition-colors'
            >
              {isLoading ? 'Loading...' : 'Choose image'}
              <input
                type='file'
                id='image-input'
                accept='image/*'
                onChange={handleFileChange}
                hidden
              />
            </label>
            <Button text='Reset' color='darkRed' resetFilters />
            <Button text='Download' color='green' onClick={handleDownload} />
          </div>
          <div className='bottom bg-[#444] w-full h-[80vh] aspect-[5/3] flex flex-col items-center justify-center p-8'>
            {!img && <ImagePlaceholder />}
            {img && (
              <div className='canvas-element h-[95%]'>
                <Canvas img={img} onCanvasReady={handleCanvasReady} />
              </div>
            )}
            {(isLoading || isPending) && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                <p className='text-white text-lg'>Processing...</p>
              </div>
            )}
          </div>
        </div>
        <div className='right w-[30%] bg-[#444] mt-10 p-5'>
          <h1 className='text-3xl font-semibold tracking-wider'>Filters</h1>
          <FilterList filters={filters} />
          <h1 className='text-3xl font-semibold tracking-wider'>Presets</h1>
          <PresetOptions />
        </div>
      </section>
    </main>
  )
}

export default memo(Editing)

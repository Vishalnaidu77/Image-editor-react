import React, { memo, useCallback, useContext, useEffect, useRef, useMemo } from 'react'
import { filterDataContext } from '../Context/FilterContext'
import { buildFilterString } from '../constants/filterDefaults'

const Canvas = memo(({ img, onCanvasReady }) => {
  const { filters } = useContext(filterDataContext)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)
  const rafIdRef = useRef(null)
  const ctxRef = useRef(null)

  // Memoize filter string to avoid recalculating on every render
  const filterString = useMemo(() => buildFilterString(filters), [filters])

  const applyFilters = useCallback(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    // Reuse context reference for performance
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', { 
        alpha: false,
        willReadFrequently: false 
      })
    }
    const ctx = ctxRef.current
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.filter = filterString
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    ctx.filter = 'none'
  }, [filterString])

  // Handle image loading
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (img) {
      imageRef.current = img
      canvas.width = img.width
      canvas.height = img.height
      ctxRef.current = null // Reset context when canvas size changes
      applyFilters()
    } else {
      imageRef.current = null
      if (ctxRef.current) {
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [img, applyFilters])

  // Throttle filter updates using RAF for smooth 60fps rendering
  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return

    // Cancel any pending frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current)
    }

    rafIdRef.current = requestAnimationFrame(applyFilters)

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [filterString, applyFilters])

  // Canvas ready callback
  useEffect(() => {
    if (onCanvasReady && canvasRef.current) {
      onCanvasReady(canvasRef.current)
    }
    return () => {
      if (onCanvasReady) onCanvasReady(null)
    }
  }, [onCanvasReady])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      id="canvas"
      style={{ imageRendering: 'high-quality' }}
    />
  )
})

Canvas.displayName = 'Canvas'

export default Canvas

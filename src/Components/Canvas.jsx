import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { filterDataContext } from '../Context/FilterContext';

const Canvas = ({ img, onCanvasReady }) => {
    const {filters} = useContext(filterDataContext)
    const [imgSelected, setImageSelected] = useState(false)
    const image = useRef(null);
    const canvasRef = useRef(null)
    const applyFilters = useCallback(() => {
        const canvas = canvasRef.current
        if(!canvas || !image.current) return

        const ctx = canvas.getContext("2d")
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.filter = `
        brightness(${filters.Brightness.value}${filters.Brightness.unit})
        contrast(${filters.Contrast.value}${filters.Contrast.unit})
        saturate(${filters.Saturation.value}${filters.Saturation.unit})
        hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
        blur(${filters.Blur.value}${filters.Blur.unit})
        grayscale(${filters.GrayScale.value}${filters.GrayScale.unit})
        sepia(${filters.Sepia.value}${filters.Sepia.unit})
        opacity(${filters.Opacity.value}${filters.Opacity.unit})
        invert(${filters.Invert.value}${filters.Invert.unit})
        `
        ctx.drawImage(image.current, 0 , 0)
        ctx.filter = "none"
    }, [filters])

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return 

        const canvasCtx = canvas.getContext("2d")

        if(img){
            setImageSelected(true)
            const applyFilterOnLoadedImage = () => {
                image.current = img;
                
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                applyFilters()
            }

            if (img.complete) applyFilterOnLoadedImage()
            else img.onload = applyFilterOnLoadedImage
            
        }
        else{
            setImageSelected(false)
            image.current = null
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
        }

        return () => {
            if(img) img.onload = null
        }
    }, [img])

    useEffect(() => {
        if(!canvasRef.current || !image.current) return

        const rafId = requestAnimationFrame(() => {
            applyFilters()
        })

        return () => cancelAnimationFrame(rafId)
    }, [filters])

    useEffect(() => {
        if(onCanvasReady && canvasRef.current) onCanvasReady(canvasRef.current)
        return () => {
            if(onCanvasReady) onCanvasReady(null)
        };
    }, [onCanvasReady])
  return (
    <canvas 
        ref={canvasRef} 
        className={`w-full h-full`} 
        id="canvas"
    ></canvas>
  )
}

export default Canvas

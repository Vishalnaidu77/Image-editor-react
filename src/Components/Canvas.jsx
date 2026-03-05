import React, { useEffect, useRef, useState } from 'react'

const Canvas = ({ img }) => {

    const [imgSelected, setImageSelected] = useState(false)
    let image = null;

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvasCtx = canvasRef.current.getContext("2d")

        if(img){
            setImageSelected(true)

            img.onload = () => {
                image = img;
                
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                canvasCtx.drawImage(img, 0, 0)
            }
        }
        else{
            setImageSelected(false)
        }
    }, [img])

  return (
    <canvas 
        ref={canvasRef} 
        className={`w-full h-full bg-white`} 
        id="canvas"
    ></canvas>

  )
}

export default Canvas

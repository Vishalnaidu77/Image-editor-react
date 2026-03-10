import React, { use, useContext, useEffect, useState } from 'react'
import Button from '../Components/Button';
import FilterRange from '../Components/FilterRange';
import Canvas from '../Components/Canvas';
import { filterDataContext } from '../Context/FilterContext';
import PresetOptions from '../Components/PresetOptions';

const Editing = () => {

  const { filters, setFilters } = useContext(filterDataContext)

  const [img, setImg] = useState(null)
  const [canvasElem, setCanvasElem] = useState(null)

  const getFile = (e) => {
    const file = e.target.files[0]
    const newImg = new Image()
    newImg.src = URL.createObjectURL(file)
    setImg(newImg)
  }

  const handleDownload = async () => {
    if (!img || !canvasElem) return

    requestAnimationFrame(async () => {
      const blob = await new Promise((blob) => (
        canvasElem.toBlob(blob, "image/png", 1)
      ))

      if (!blob) return;

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `edited-image.png`
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url)
    })
  }

  return (
    <main>
      <section className='py-4 px-10 flex gap-4'>
        <div className="left w-[70%] flex flex-col gap-8 items-center">
          <div className="top flex justify-center gap-10 items-center">
            <label 
            htmlFor="image-input"
            className='py-2 px-4 bg-[#eee] text-[#222] rounded-md cursor-pointer'
            >
              Choose image
              <input 
                type="file" 
                id='image-input' 
                accept='image/*' 
                onChange={(e) => getFile(e)}
                hidden
              />
            </label>
            <Button text="Reset" color="darkRed" resetFilters />            
            <Button text="Download" color="green" onClick={handleDownload} />
          </div>
          <div className="bottom bg-[#444] w-full h-[80vh] aspect-[5/3] flex flex-col items-center justify-center p-8">
            <div className={`placeholder ${img ? 'hidden' : 'block'}`}>
               <svg className='h-72' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
               <p className='text-lg'>No image is choosen</p>
            </div>
            {img 
              ? (
                <div className='canvas-element h-[95%]'>
                  <Canvas img={img} onCanvasReady={setCanvasElem}/>
                </div>
              )
              : null
              }
          </div>
        </div>
        <div className="right w-[30%] bg-[#444] mt-10 p-5">
          <h1 className='text-3xl font-semibold tracking-wider'>Filters</h1>
          <div className="filters p-5 flex flex-col gap-7">
            {Object.keys(filters).map((filter, idx) => {
              return <FilterRange key={idx}
                        filterName={filter} 
                        min={filters[filter].min} 
                        max={filters[filter].max} 
                        value={filters[filter].value} 
                        unit={filters[filter].unit}
                        filters={filters}
                        setFilters={setFilters}
                      />
            })}
          </div>
          <h1 className='text-3xl font-semibold tracking-wider'>Presets</h1>
          <PresetOptions />
        </div>
      </section>
    </main>
  )
}

export default Editing;

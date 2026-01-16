import React from 'react'
import Button from '../Components/Button';

const Editing = () => {
  return (
    <main>
      <section className='py-8 px-10'>
        <div className="left w-[60%] flex flex-col gap-8 items-center">
          <div className="top flex justify-center gap-10 items-center">
            <label 
            htmlFor="image-input"
            className='py-2 px-4 bg-[#eee] text-[#222] rounded-md cursor-pointer'
            >
              Choose image
              <input type="file" id='image-input' accept='image/*' hidden/>
            </label>
            <Button text="Reset" color="darkRed"/>            
            <Button text="Download" color="green"/>
          </div>
          <div className="bottom bg-[#444] w-full aspect-[5/3]">
            <div className="placeholder flex flex-col items-center justify-center h-full">
               <svg className='h-72' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
               <p className='text-lg'>No image is choosen</p>
            </div>
          </div>
        </div>
        <div className="right w-[40%] bg-[#444] h-full">

        </div>
      </section>
    </main>
  )
}

export default Editing;

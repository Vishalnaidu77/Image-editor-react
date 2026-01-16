import React from 'react'
import { NavLink } from 'react-router-dom'
import Button from './Button'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center py-7 px-10'>
      <div className="left">
        <h1 className='text-3xl font-bold text-[#fff]'>Image Craft</h1>
      </div> 
      <div className="right">
        <NavLink to="/editing">
          <Button text="Edit your image"/>
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar

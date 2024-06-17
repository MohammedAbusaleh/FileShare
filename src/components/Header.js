import React from 'react'
import logo from '../assets/OursLogo.png';

// rfce: to add the dankey work
function Header() {
  return (
    <div className="flex items-center justify-between py-2 px-4 bg-customeGrey">
      <div className="flex items-center space-x-4">
        <h1 className="text-5xl font-bold text-white">DD</h1>
        <img src={logo} alt="Ours Logo" className='w-14 h-14 object-contain'/>
      </div>

      <p className="hidden sm:block text-lg font-bold text-white text-center">no no no... it is not your file... it is OURS</p>

      <button type="submit" className="py-2 px-4 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white rounded-md">
        Login
      </button>
    </div>
  )
}

export default Header

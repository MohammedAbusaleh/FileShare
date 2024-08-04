import React from 'react'
import logo from '../assets/OursLogo.png';

// rfce: to add the dankey work
function Header() {
  return (
    <div className="relative flex items-center py-2 px-4 bg-customeGrey border-b border-b-white">
      <a href='/' className="flex items-center space-x-4">
        <h1 className="text-5xl font-bold text-white">DD</h1>
        <img src={logo} alt="Ours Logo" className='w-14 h-14 object-contain'/>
      </a>

      <p className="hidden sm:block text-lg font-bold text-white absolute left-1/2 transform -translate-x-1/2">
        no no no... it is not your file... it is OURS
      </p>
    </div>
  )
}

export default Header

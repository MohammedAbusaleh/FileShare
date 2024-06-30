import React from 'react'
import logo from '../assets/OursLogo.png';

function ErrorPage() {
  return (
    <div className='min-h-screen bg-customeGrey flex flex-col justify-center items-center'>
        <a href='/'><img src={logo} alt="Ours Logo" className='object-contain w-auto h-96'/></a>
        <h1 className="text-5xl font-bold text-white">Go Back Brother</h1>
    </div>
  )
}

export default ErrorPage

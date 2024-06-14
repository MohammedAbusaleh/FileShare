import React from 'react'

function CodeForm() {
  return (
    <div className='min-h-64 min-w-96 rounded-lg bg-customeGrey/50 flex items-center justify-center'>        
      <form id="roomForm" onsubmit="handleSubmit(event)" className='flex flex-col items-center'>
        <label for="code" className='mb-2 text-2xl text-white font-semibold'>
          Enter Room Code
        </label>

        <input type="text" name="code" id="code" autoComplete='off' className="mb-2 px-2 py-2 text-2xl font-bold border border-white/40 text-white bg-customeGrey text-center rounded-md w-full max-w-xs focus:border-white/70 focus:ring-0 focus:outline-none" />

        <button type="submit" className='py-2 text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white w-full max-w-xs rounded-md'>
          Let's Gooo
        </button>
      </form>
    </div>
  )
}

export default CodeForm

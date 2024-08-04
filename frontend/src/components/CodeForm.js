import React from 'react'

function CodeForm({roomCode, handleSubmit, handleInputChange, handleCreateRoom}) {

  return (
    <div className='flex-col min-h-64 min-w-96 rounded-lg bg-customeGrey/50 flex items-center justify-center'>        
      <form id="roomForm" onSubmit={handleSubmit} className='flex flex-col items-center'>
        <label htmlFor="code" className='mb-2 text-2xl text-white font-semibold'>
          Enter Room Code
        </label>

        <input
          type="text"
          name="code"
          id="code"
          autoComplete='off'
          maxLength={45}
          value={roomCode}
          onChange={handleInputChange}
          className="mb-2 px-2 py-2 text-2xl font-bold border border-white/40 text-white bg-customeGrey text-center rounded-md w-full max-w-xs focus:border-white/70 focus:ring-0 focus:outline-none"
        />

        <button type="submit" className='mb-2 py-2 text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white w-full max-w-xs rounded-md'>
          Let's Gooo
        </button>
      </form>
      <button onClick={handleCreateRoom} className='py-2 text-2xl font-semibold border border-red-600 bg-transparen bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white w-full max-w-xs rounded-md'>Create Room</button>
    </div>
  )
}

export default CodeForm

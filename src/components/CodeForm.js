import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CodeForm() {
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (roomCode) {
      navigate(`/r/${roomCode}`)
    } else {
      alert('Brohter enter a room code')
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setRoomCode(value);
    }
  }

  return (
    <div className='min-h-64 min-w-96 rounded-lg bg-customeGrey/50 flex items-center justify-center'>        
      <form id="roomForm" onSubmit={handleSubmit} className='flex flex-col items-center'>
        <label htmlFor="code" className='mb-2 text-2xl text-white font-semibold'>
          Enter Room Code
        </label>

        <input
          type="text"
          name="code"
          id="code"
          autoComplete='off'
          value={roomCode}
          onChange={handleInputChange}
          // pattern='[a-z|A-Z|0-9]*'
          maxLength={6}
          className="mb-2 px-2 py-2 text-2xl font-bold border border-white/40 text-white bg-customeGrey text-center rounded-md w-full max-w-xs focus:border-white/70 focus:ring-0 focus:outline-none"
        />

        <button type="submit" className='py-2 text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white w-full max-w-xs rounded-md'>
          Let's Gooo
        </button>
      </form>
    </div>
  )
}

export default CodeForm

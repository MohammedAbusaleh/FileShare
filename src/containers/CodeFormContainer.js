import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeForm from '../components/CodeForm';

function CodeFormContainer() {
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (roomCode) {
      navigate(`/room/${roomCode}`)
    } else {
      alert('Brohter enter a room code')
    }
  }

  async function handleCreateRoom() {
    if (isCreating) return

    setIsCreating(true)
    try {
      const idResponse = await fetch('http://localhost:8000/get-generated-id');
      if (!idResponse.ok) {
        throw new Error('Failed to generate room ID');
      }
      const idData = await idResponse.json()
      const roomResponse = await fetch(`http://localhost:8000/create-room/${idData.roomId}`)
      const roomData = await roomResponse.json()
      console.log(roomData)

      if (!roomResponse.ok) {
        throw new Error(`unknown server error`)
      }
      if (!roomData.roomId) {
        throw new Error(roomData.error)
      }
      navigate(`/room/${roomData.roomId}`)

    } catch (error) {
      console.error('Error creating room:', error.message);
      alert("Failed to create room, please try again later")
    } finally {
      setIsCreating(false)
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^[a-z-]*$/.test(value)) {
      setRoomCode(value);
    }
  }

  return (
    <CodeForm roomCode={roomCode} handleSubmit={handleSubmit} handleInputChange={handleInputChange} handleCreateRoom={handleCreateRoom}/>
  )
}

export default CodeFormContainer

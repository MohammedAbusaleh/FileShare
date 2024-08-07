import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CodeForm from '../components/CodeForm';
import axios from 'axios';
import { handleError } from '../utils/errorHandler';

function CodeFormContainer() {
  const [roomCode, setRoomCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate()

  const handleSubmitRoom = (event) => {
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
      const { data: idData } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/get-generated-id`);
      if (idData.error) {
        throw new Error(`Failed to generate room code (id): ${idData.error}`)
      }

      const { data: roomData } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/create-room`, {roomId: idData.roomId})
      if (roomData.error) {
        throw new Error(`Failed to create room: ${roomData.error}`)
      }
      
      navigate(`/room/${roomData.roomId}`)

    } catch (error) {
      handleError(error, `${error}`)
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
    <CodeForm roomCode={roomCode} handleSubmit={handleSubmitRoom} handleInputChange={handleInputChange} handleCreateRoom={handleCreateRoom}/>
  )
}

export default CodeFormContainer

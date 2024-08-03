import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SendFilesButton from '../components/SendFilesButton';
import { handleError } from '../utils/errorHandler';

function SendFilesButtonContainer({ files, setFiles, setSharedFiles, setInSendingProcess }) {
    const { roomCode } = useParams()

    async function isThereEdgeCases() {
      if (files.length === 0){
        alert('Add a file genius')
        return true
      }
      
      try {
        const { data } = await axios.get(`http://localhost:8000/check/${roomCode}`)
        
        if (!data.doesRoomExists){
          throw new Error('Room Does Not Exist Anymore')
        }
      } catch (error) {
        handleError(error, error.message)
        return true
      }
      
      return false
    }
    
    async function handleSendingFiles() {
      setInSendingProcess(true)
      
      if (await isThereEdgeCases()) {
        setInSendingProcess(false)
        return
      }
      
      const formData = new FormData();
      
      for (const file of files) {
        try {
          if (file.size > parseInt(process.env.REACT_APP_MAX_FILE_SIZE, 10)){
            throw new Error('File is too large')
          }

          formData.append('file', file);
          const { data} = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload/${roomCode}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
    
          if (data.error) {
              throw new Error(`Failed to send files: ${data.error}`);
          }
           
          setSharedFiles(prevSharedFiles => [
            ...prevSharedFiles,
            { filename: data.filename, fileURL: data.url }
          ])   
        } catch (error) {
          handleError(error, `${file.name} failed to upload (check file size)`)
        } finally {
          setFiles(prevFiles => prevFiles.filter(f => f !== file))          
        }
      }
      setInSendingProcess(false)
    }

  return (
    <SendFilesButton onClick={handleSendingFiles} />
  )
}

export default SendFilesButtonContainer

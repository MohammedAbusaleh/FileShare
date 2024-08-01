import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import SendFilesButton from '../components/SendFilesButton';

function SendFilesButtonContainer({ files, setFiles, setSharedFiles, setInSendingProcess }) {
    const { roomCode } = useParams()

    async function checkForEdgeCases() {
      if (files.length === 0){
        alert('Add a file genius')
        return true
      }
      try {
        const response = await axios.get(`http://localhost:8000/check/${roomCode}`)

        if (response.status !== 200){
          return true
        }
        if (!response.data.doesRoomExists) {
          return true
        }

      } catch (error) {
        return true
      }
      
      return false
    }
    
    async function handleSendingFiles() {
      setInSendingProcess(true)

      if (await checkForEdgeCases()) {
        setInSendingProcess(false)
        return
      }

      const formData = new FormData();
      
      for (const file of files) {
        try {
          if (file.size > 5 * 1024 * 1024){
            throw new Error('File is too large')
          }

          formData.append('file', file);
          const response = await fetch(`http://localhost:8000/upload/${roomCode}`, {
            method: 'POST',
            body: formData
          })
    
          if (!response.ok) {
            throw new Error(`Failed to upload ${file.name}: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.error) {
              throw new Error(`Error from backend: ${data.error}`);
          }
           
          setSharedFiles(prevSharedFiles => [
            ...prevSharedFiles,
            { filename: data.filename, fileURL: data.url }
          ])
          
        } catch (error) {
          console.error('Error uploading files:', error)
          toast.error(`${file.name} failed to upload (check file size)`, {
            position: "top-left",
            autoClose: 10000,
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          })
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

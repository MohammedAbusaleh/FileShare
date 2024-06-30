import React from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SendFilesButton from '../components/SendFilesButton';

function SendFilesButtonContainer({ files, setFiles, setSharedFiles, setInSendingProcess }) {
    const { roomCode } = useParams()
    
    async function handleSendingFiles() {
      if (files.length === 0){
        alert('Add a file genius')
        return
      }

      setInSendingProcess(true)
      const formData = new FormData();
      
      for (const file of files) {
        formData.append('file', file);
  
        try {
          const response = await fetch(`http://localhost:8000/upload/${roomCode}`, {
            method: 'POST',
            body: formData
          })
    
          if (!response.ok){
            throw new Error(`Failed to upload ${file.name}: ${response.statusText}`)
          } else {
            const result = await response.json();

            
            setSharedFiles(prevSharedFiles => [
              ...prevSharedFiles,
              { filename: result.filename, fileURL: result.url }
            ])
          }
        } catch (error) {
          console.error('Error uploading files:', error.message)
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

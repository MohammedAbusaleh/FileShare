import React, { useLocation } from 'react';
import { useParams } from 'react-router-dom';

function SendFilesButton({ files, setFiles, setSharedFiles, setInSendingProcess }) {
    const { roomCode } = useParams()
    
    async function handleSnedingFiles() {
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

            setFiles(prevFiles => prevFiles.filter(f => f !== file))

            setSharedFiles(prevSharedFiles => [
              ...prevSharedFiles,
              { filename: result.filename, fileURL: result.url }
            ])
          }
        } catch (error) {
          console.error('Error uploading files:', error.message)
        }
      }
      setInSendingProcess(false)
    }

    return (
    <div className='flex justify-center items-center'>
      <button onClick={handleSnedingFiles} className='w-full text-white font-bold py-2 px-4 rounded bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'>
        Send Files
      </button>
    </div>
    );
}

export default SendFilesButton;

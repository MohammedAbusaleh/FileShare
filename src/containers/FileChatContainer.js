import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilesChat from '../components/FilesChat';

function FilesChatContainer({ sharedFiles, setSharedFiles }) {
  const { roomCode } = useParams()
  
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`http://localhost:8000/room/${roomCode}`)
        if (!response.ok){
          throw new Error(`Failed to fetch files: ${response.statusText}`)
        } else {
          const data = await response.json()
          setSharedFiles(data.files)
        }
      } catch (error) {
        console.error('Error uploading files:', error.message)
      }
    }

    fetchFiles();
  }, [])


  return (
    <FilesChat sharedFiles={ sharedFiles }/>
  );
}

export default FilesChatContainer;

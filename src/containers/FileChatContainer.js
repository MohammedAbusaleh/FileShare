import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilesChat from '../components/FilesChat';
import axios from 'axios';
import { handleError } from '../utils/errorHandler';

function FilesChatContainer({ sharedFiles, setSharedFiles }) {
  const { roomCode } = useParams()
  
  useEffect(() => {
    async function fetchFiles() {
      try {
        const { data } = await axios.get(`http://localhost:8000/room/${roomCode}`)

        if (data.error) {
          throw new Error(`Failed to fetch files: ${data.error}`)
        }

        setSharedFiles(data.files)
      } catch (error) {
        handleError(error, 'Faild to fetch files')
      }
    }
    if (sharedFiles.length === 0) {
        fetchFiles();
      }
  }, [])


  return (
    <FilesChat sharedFiles={ sharedFiles }/>
  );
}

export default FilesChatContainer;

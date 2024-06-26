import { React, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function FilesChat({ sharedFiles, setSharedFiles }) {
  const { roomCode } = useParams()
  
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch(`http://localhost:8000/r/${roomCode}`)
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
    <div className='w-1/2 bg-customeDarkGrey border rounded-lg border-transparent overflow-y-auto p-4 scrollbar scrollbar-thumb-red-500'>
      {sharedFiles.map((file) => (
        <a href={file.fileURL} download className='block w-full p-2 mb-2 text-white bg-customeGrey hover:bg-gray-600 transition-colors duration-200 rounded overflow-hidden whitespace-nowrap text-ellipsis'>
          {file.filename}
        </a>
      ))}
    </div>
  );
}

export default FilesChat;

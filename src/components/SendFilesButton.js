import React from 'react';
import { storage } from '../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'

function SendFilesButton({ files, setFiles, setSharedFiles }) {
    async function handleSnedingFiles() {
      if (files.length === 0){
        alert('Add a file genius')
      }

      for (const file of files) {
        const imageRef = ref(storage,  `${v4() + file.name}`)

        try {
          await uploadBytes(imageRef, file)

          setSharedFiles((prevFiles) => {
            const sharedFiles = [...prevFiles, file]
  
            setFiles((prevFiles) => prevFiles.filter(prevFile => prevFile !== file))
  
            return sharedFiles
          })  
        } catch (error) {
          console.error('Error uploading file: ', file)
        }
      }     
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

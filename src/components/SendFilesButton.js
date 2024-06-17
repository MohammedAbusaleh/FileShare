import React from 'react';

function SendFilesButton({ files, setFiles, setSharedFiles }) {
    function handleSnedingFiles() {
      setSharedFiles((prevFiles) => {
          const sharedFiles = [...prevFiles, ...files]

          setFiles((prevFiles) => prevFiles.filter(file => !sharedFiles.includes(file)))

          return sharedFiles
      })      
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

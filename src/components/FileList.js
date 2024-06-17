import React from 'react'

// rfce: to add the dankey work
function FileList({ files, setFiles }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '....';
    } else {
      return text;
    }
  };

  const deleteFile = (indexToDelete) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToDelete))
  }
  

  return (
    <div className='flex flex-grow bg-customeDarkGrey rounded-lg border border-transparent p-4'>
      <div className='flex flex-wrap gap-2 h-min overflow-y-hidden max-h-full'>
        {files.map((file, index) => (
          <button key={index} onClick={() => deleteFile(index)} className='w-32 py-1 text-white font-bold rounded shadow-md bg-green-500 hover:bg-red-500 transition-colors duration-200 text-center'>
            {truncateText(file.name, 12)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FileList

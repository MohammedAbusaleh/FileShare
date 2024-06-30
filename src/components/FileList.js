import React, { useState } from 'react'

// rfce: to add the dankey work
function FileList({ files, setFiles, inSendingProcess }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const deleteFile = (indexToDelete) => {
    setHoveredIndex(null)
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToDelete))
  }
  

  return (
    <div className='flex h-1/2 bg-customeDarkGrey rounded-lg border border-transparent p-4'>
      <div className='flex flex-wrap gap-2 h-min max-h-full overflow-y-hidden'>
        {files.map((file, index) => (
          <button
          key={index}
          onClick={() => deleteFile(index)}
          className={`w-36 p-2 text-white overflow-hidden whitespace-nowrap text-ellipsis font-bold rounded shadow-md hover:bg-red-500 transition-colors duration-200 text-center ${inSendingProcess && index === 0 ? 'animate-pulse bg-red-300' : 'bg-customeGrey'}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? `${(file.size / 1024).toFixed(2)} KB` : file.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FileList

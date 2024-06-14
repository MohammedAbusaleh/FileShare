import React from 'react'

// rfce: to add the dankey work
function FileList({ names }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '....';
    } else {
      return text;
    }
  };
  

  return (
    <div className='p-4 w-40'>
      {names.map((name, index) => (
        <button key={index} className='block w-full text-white font-bold py-2 rounded shadow-md bg-green-500 hover:bg-red-500 mb-2 text-center'>
          {truncateText(name, 12)}
        </button>
      ))}
    </div>
  )
}

export default FileList

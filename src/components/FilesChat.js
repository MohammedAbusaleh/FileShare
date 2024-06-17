import React from 'react';

function FilesChat({ sharedFiles }) {

  const downloadFile = (file) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className='bg-customeDarkGrey h-full border rounded-lg border-transparent overflow-y-scroll p-4'>
      {sharedFiles.map((file, index) => (
        <div
          key={index}
          className={`p-2 w-2/5 bg-white mb-2 shadow rounded ${
            index % 5 === 0 ? 'float-start' : 'float-end'
          }`}
          onClick={() => downloadFile(file)}
          style={{ clear: 'both' }} // Ensure elements clear previous floats (GOOGLE)
        >
          {file.name}
        </div>
      ))}
    </div>
  );
}

export default FilesChat;

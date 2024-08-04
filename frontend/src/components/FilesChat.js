import { React } from 'react';

function FilesChat({ sharedFiles }) {
  return (
    <div className='w-1/2 bg-customeDarkGrey border rounded-lg border-transparent overflow-y-auto p-4 scrollbar scrollbar-thumb-red-500'>
      {sharedFiles.map((file, index) => (
        <a key={index} href={file.fileURL} download className='block w-full p-2 mb-2 text-white bg-customeGrey hover:bg-gray-600 transition-colors duration-200 rounded overflow-hidden whitespace-nowrap text-ellipsis'>
          {file.filename}
        </a>
      ))}
    </div>
  );
}

export default FilesChat;

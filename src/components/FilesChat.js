import { React, useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, listAll, getDownloadURL } from 'firebase/storage';

function FilesChat({ sharedFiles }) {
  const [dbFiles, setDbFiles] = useState([])

  useEffect(() => {
    const dbFilesRef = ref(storage, "")
    listAll(dbFilesRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setDbFiles((prev) => [...prev, url])
          console.log(url)
        })
      })
    }) 
  }, [])

  
  return (
    <div className='bg-customeDarkGrey h-full border rounded-lg border-transparent overflow-y-scroll p-4'>
      {dbFiles.map((file, index) => (
        <a
          key={index}
          href={file}
          download
          className={`p-2 w-2/5 bg-white mb-2 shadow rounded ${
            index % 2 === 0 ? 'float-start' : 'float-end'
          }`}
          style={{ clear: 'both' }} // Ensure elements clear previous floats (GOOGLE)
        >
          dd
        </a>
      ))}
    </div>
  );
}

export default FilesChat;

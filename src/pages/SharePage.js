import React, { useState, useEffect } from 'react'
import FileUpload from '../FileUpload'


function SharePage() {
  const [files, setFile] = useState([])

  function handleFile({target}) {
    setFile((prevFiles) => [...prevFiles, ...target.files])
  }

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div className='min-h-screen bg-slate-800 flex flex-col justify-center'>
        <form>
          <input type='file' name='file' onChange={handleFile}/>
        </form>
        <FileUpload />
    </div>
    );
}

export default SharePage

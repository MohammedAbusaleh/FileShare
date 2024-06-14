import React, { useState, useEffect } from 'react'
import FileUpload from '../FileUpload'
import FileList from '../FileList'


function SharePage() {
  const [files, setFile] = useState([])

  function handleFile({target}) {
    const newFiles = target.files[0].name
    setFile((prevFiles) => [...prevFiles, newFiles])
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
        <FileList names={files}/>
    </div>
    );
}

export default SharePage

import React, { useState, useEffect } from 'react'
import FileList from '../components/FileList'
import DragNDrop from '../components/DragNDrop'
import SizeDisplaier from '../components/SizeDisplaier'
import FilesChat from '../components/FilesChat'
import SendFilesButton from '../components/SendFilesButton'


function SharePage() {
  const [files, setFiles] = useState([])
  const [sharedFiles, setSharedFiles] = useState([])

  useEffect(() => {
    console.log(files)
    files.map((file) => console.log(file.size))
  }, [files])

  return (
    <div className='bg-customeGrey h-screen flex gap-10 p-4'>
      <div className='h-full w-3/5 flex flex-col gap-5'>
        <DragNDrop setFiles={setFiles}/>
        {/* <SizeDisplaier files={files}/> */}
        <FileList files={files} setFiles={setFiles}/>
        <SendFilesButton files={files} setFiles={setFiles} setSharedFiles={setSharedFiles}/>
      </div>
      <div className='w-2/5'>
        <FilesChat sharedFiles={sharedFiles}/>
      </div>
    </div>
    );
}

export default SharePage

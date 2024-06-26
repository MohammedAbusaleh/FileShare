import React, { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/Header'
import FileList from '../components/FileList'
import DragNDrop from '../components/DragNDrop'
// import SizeDisplaier from '../components/SizeDisplaier'
import FilesChat from '../components/FilesChat'
import SendFilesButton from '../components/SendFilesButton'


function SharePage() {
  const [files, setFiles] = useState([])
  const [sharedFiles, setSharedFiles] = useState([])
  const [inSendingProcess, setInSendingProcess] = useState(false)

  const { roomCode } = useParams();
  if (!/^[a-zA-Z0-9]{6}$/.test(roomCode)) {
    return <Navigate to="/Naughty" />;
  }

  return (
    <div className='h-screen bg-customeGrey flex flex-col'>
      <Header />
      <div className='flex overflow-y-auto flex-row gap-5 p-2'>
        <div className='w-1/2 flex space-y-5 flex-col'>
          <DragNDrop setFiles={setFiles}/>
          <FileList files={files} setFiles={setFiles} inSendingProcess={inSendingProcess}/>
          <SendFilesButton files={files} setFiles={setFiles} setSharedFiles={setSharedFiles} setInSendingProcess={setInSendingProcess}/>
        </div>
        <FilesChat sharedFiles={sharedFiles} setSharedFiles={setSharedFiles}/>
      </div>
    </div>
    );
}

export default SharePage

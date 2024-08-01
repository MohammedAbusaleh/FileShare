import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import FileList from '../components/FileList'
import DragNDrop from '../components/DragNDrop'
import SendFilesButtonContainer from '../containers/SendFilesButtonContainer';
import FilesChatContainer from '../containers/FileChatContainer';


function SharePage() {
  const { roomCode } = useParams();
  const [files, setFiles] = useState([])
  const [sharedFiles, setSharedFiles] = useState([])
  const [inSendingProcess, setInSendingProcess] = useState(false)
  const navigate = useNavigate()
  const roomCheckRan = useRef(false)

  useEffect(() => {
    if (roomCheckRan.current) return

    async function checkRoom() {
      try {
        const response = await fetch(`http://localhost:8000/check/${roomCode}`)
        if (!response.ok){
          throw new Error(`Couldn't find room: ${response.statusText}`)
        }
        const data = await response.json()
        if (!data.doesRoomExists) {
          navigate("/Naughty", { replace: true })
        }
      } catch (error) {
        console.error('Error uploading files:', error.message)
      }
    }
    
    checkRoom();
  }, [inSendingProcess])
  

  return (
    <div className='h-screen bg-customeGrey flex flex-col'>
      <Header />
      <div className='flex overflow-y-auto flex-row gap-5 p-2'>
        <div className='w-1/2 flex space-y-5 flex-col'>
          <DragNDrop setFiles={setFiles}/>
          <FileList files={files} setFiles={setFiles} inSendingProcess={inSendingProcess}/>
          <SendFilesButtonContainer files={files} setFiles={setFiles} setSharedFiles={setSharedFiles} setInSendingProcess={setInSendingProcess}/>
        </div>
        <FilesChatContainer sharedFiles={sharedFiles} setSharedFiles={setSharedFiles}/>
      </div>
    </div>
    );
}

export default SharePage

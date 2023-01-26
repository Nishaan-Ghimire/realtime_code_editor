import React, { useState, useRef } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import '../styles/editorPage.css';
import { initSocket } from '../socket';
import { useEffect } from 'react';
import ACTIONS from './Actions';
import { useLocation,useNavigate,Navigate,useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Editorpage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const {roomId} = useParams();
  const [clients, setClients] = useState([]);

  let i = 0;
  useEffect(() =>{
    if(i > 0)
    return
    i++;
    const init = async() =>{
      socketRef.current = await initSocket();
      socketRef.current.emit(ACTIONS.JOIN,{roomId,username: location.state?.username,});

      // Listening to events
      socketRef.current.on(ACTIONS.JOINED,
        ({clients,username,socketId})=>{
          console.log('found')
          if(username !== location.state?.username)
          {
            toast.success(`${username} joined room`);
            console.log(`${username} joined room`);
            console.log("All clients are ",clients);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE,{
            code: codeRef.current,
            socketId,
          })
        })
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));
      function handleErrors(e)
      {
        console.log('socket error',e);
        toast.error('Socket connection failed, try again later');
        reactNavigator('/');
      }


      socketRef.current.on(
        ACTIONS.DISCONNECTED,({socketId,username})=>{
        toast.success(`${username} left the room`);
        setClients((prev)=>{
          return prev.filter(client=>client.socketId !== socketId
            );
        });
      }
      );
    
    };
    init();
if(socketRef.current){
  return () => {
    socketRef.current.disconnect();
    socketRef.current.off(ACTIONS.JOINED);
    socketRef.current.off(ACTIONS.DISCONNECTED);
};
}
  
  },[]);

    const copyRoomId = async()=>{
      try{
        await navigator.clipboard.writeText(roomId);
        toast.success('Room Id copied to your clipboard');
      }catch(err)
      {
        toast.error('Room Id cannot be copied please try manually');
        console.error(err);
      }
    }

  const leaveRoom = ()=>{
    reactNavigator('/');
  }

    if(!location.state)
    {
      return <Navigate to='/' />;
    }

  return (
    <div className='mainWrapper'>
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/Code_Together.png" alt="" className="logoImage" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
              {clients.map(client=><Client key={client.socketId} username={client.username}/>)}
          </div>
        </div>
      <div className="btns">

        <button className='btn copyBtn' onClick={copyRoomId}>Copy RoomID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
      </div>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} onCodeChange={code=>codeRef.current = code} />
      </div>
    </div>
  )
}

export default Editorpage

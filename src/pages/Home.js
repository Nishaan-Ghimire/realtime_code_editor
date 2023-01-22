import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';


const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleEnter = (e) =>{
    if(e.code === 'Enter')
    {
      joinRoom();
    }
  }

const joinRoom = () =>{
  if(!roomId || !username)
  {
    toast.error('Please enter username and room id');
    return;
  }
  navigate(`/editor/${roomId}`,{username});
}  
const createNewRoom = (e)=>{
  e.preventDefault();
  const id = uuidv4();
  setRoomId(id);
  toast.success('Success! New room created');
}
  return (
    <div className='homePageWrapper'>
      <div className="wrapper">


        <div className="formWrapper">
          <div className="logoimg">
          <img src="/Code_Together.png" className='logo' alt="Code_Together_logo" />

          </div>
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input type="text" className='inputBox' onChange={(e)=>setRoomId(e.target.value)} onKeyUp={handleEnter} value={roomId} placeholder='ROOM ID' />
            <input type="text" className='inputBox' onChange={(e)=>setUsername(e.target.value)} onKeyUp={handleEnter} value={username} placeholder='USERNAME' />
            <div className="btn joinBtn" onClick={joinRoom}>Join</div>
            <span className="createInfo">
              If you don't have an invite then create &nbsp; 
              <a onClick={createNewRoom}href="" className="createNewBtn">new room</a>
            </span>
          </div>
        </div>

        <footer>
          <h4>Powered by <a href="https://github.com/nishaan-ghimire">Nishan Production </a> copyright &copy; 2023</h4>
        </footer>
        </div>
    </div>
  )
}

export default Home

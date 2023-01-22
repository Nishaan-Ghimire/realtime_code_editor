import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from '../components/Editor';
import '../styles/editorPage.css';

const Editorpage = () => {
  const [clients, setClients] = useState([
    {
      socketId: 1,
      username: "Nishan G"
    }, {
      socketId: 2,
      username: "John Doe"
    }]);
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

        <button className='btn copyBtn'>Copy RoomID</button>
        <button className='btn leaveBtn'>Leave</button>
      </div>
      </div>
      <div className="editorWrap">
        <Editor/>
      </div>
    </div>
  )
}

export default Editorpage

import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
// import SideBar from './components/SideBar';
// import Inputbox from './components/Inputbox';
// import Joinbox from './components/Joinbox';

// Connecting the front end to the back end
const socket = io.connect('http://localhost:3001');

export default function App () {
// Use this to emit events whenever we need
// Importing useEffect Hook
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  // creating use state to only show chat if you joined a room
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== '' && room !== '') {
      // If a username and room # exist we pass the room to join room
      // This is sent to the back end to activate the event listerner join_room
        socket.emit("join_room", room);
        //Whenever join room is true then the chat will be visibile 
        setShowChat(true);
    }
  }

  return(
    <>
    <div className='App'>
      {!showChat ? (
    <div className='join-chat-container'>
    <h3>Join Chat</h3>
    <hr></hr>
    <input type="text" placeholder='Name' onChange={(event) => {setUsername(event.target.value)}}/>
    <hr></hr>
    <input type="text" placeholder='Room ID..' onChange={(event) => {setRoom(event.target.value)}}/>
    <hr></hr>
    {/* On click the join room function is called */}
    <button onClick={joinRoom}>Join a room</button>
    </div>
      )
  : (
    <ChatRoom socket={socket} username={username} room={room} />
  ) }
  {/* Line 39 is Passing socket into the ChatRoom component */}
    </div>
    </>
  );
}
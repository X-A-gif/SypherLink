import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

// Connecting the front end to the back end
const socket = io.connect('http://localhost:3001');

export default function App () {
// Use this to emit events whenever we need
// Importing useEffect Hook
  const [room, setRoom] = useState('');
  // creating use state to only show chat if you joined a room
  const [showChat, setShowChat] = useState(false);

  console.log(showChat);

  const joinRoom = () => {
    if(room !== '') {
      // If a username and room # exist we pass the room to join room
      // This is sent to the back end to activate the event listerner join_room
        socket.emit("join_room", room);
        //Whenever join room is true then the chat will be visibile 
        setShowChat(true);
    }
  }

  return(
    <>
    <div className='App bg-slate-900'>
      {!showChat ? (
    <div className='join-chat-container'>
    <h3>Join Chat</h3>
    <hr></hr>
    <input type="text" placeholder='Room ID..' onChange={(event) => {setRoom(event.target.value)}}/>
    <hr></hr>
    {/* On click the join room function is called */}
    <button className="rounded-md 
    bg-indigo-600 px-3 py-2 text-sm font-semibold text-white 
    shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
    focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
    onClick={joinRoom}>Join a room</button>
    </div>
      )
  : (
    <ChatRoom socket={socket} room={room} />
  ) }
  {/* Line 45 is Passing socket into the ChatRoom component */}
    </div>
    </>
  );
}
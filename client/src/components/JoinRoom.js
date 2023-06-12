import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import SideBar from './SideBar.js';

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
    
    <div className='App h-screen bg-slate-900 flex justify-center items-center'>
      <SideBar />
  {!showChat ? (
    <div className='join-chat-container w-2/5 mx-auto bg-transparent rounded-lg shadow-md backdrop-filter backdrop-blur-sm border border-white border-opacity-20'>
      <h3 className='text-center text-white uppercase rounded text-2xl tracking-wider mt-8'>Join A Chat Room</h3>
      <div className='text-center'>
      <input
        type="text"
        className='mt-8 text-sm w-1/2 px-4 py-2 border border-solid border-gray-00 rounded'
        placeholder='Room ID..'
        onChange={(event) => { setRoom(event.target.value) }}
      />
      </div>
      <div className='text-center'>
      {/* On click the join room function is called */}
      <button
        className="my-8 w-1/4 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={joinRoom}
      >
        Join 
      </button>
      </div>
    </div>
  ) : (
    <ChatRoom socket={socket} room={room} />
  )}
</div>

  
  );
}
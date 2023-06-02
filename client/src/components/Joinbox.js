import { useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3000");

const Joinbox = () => {
    const [room, setRoom] = useState("");

    const joinRoom = () => {
      if (room !== "") {
        //emit the room that the user writes to the room useState
        socket.emit("join_room", room);
      }
    };
  
  return (
    <main>
         {/* room number form */}
      <input placeholder='Room Number...' onChange={(event) => {
        setRoom(event.target.value);
      }}/>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold 
      text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={joinRoom}>Join Room</button>
      </main>
  )
}

export default Joinbox
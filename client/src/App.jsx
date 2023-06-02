

import io from 'socket.io-client';
// Use this to emit events whenever we need
const socket = io.connect("http://localhost:3000");
// Importing useEffect Hook
import { useEffect, useState } from 'react';
import SideBar from './components/SideBar';

export default function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      //emit the room that the user writes to the room useState
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    //This message is emitted to the backend
    //The message will be from the useState so it takes the message and the specific room
    socket.emit("send_message", { message, room });
  };

  //Listening to the broadcast event (whenever an event is emitted the function will run again)
  useEffect(() => {
    //Listening to event receive_message incase it happens
    socket.on("receive_message", (data) => {
      //This grabs the current message inputted
      setMessageReceived(data.message);
    })
  }, [socket]);

  return(
    <div className="App">
      <SideBar />
      <input placeholder='Room Number...' onChange={(event) => {
        setRoom(event.target.value);
      }}/>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={joinRoom}>Join Room</button>
      <input placeholder="Message..." onChange={() => {
        //Grabbing the message value and setting it to the new message
        setMessage(event.target.value);
      }}/>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={sendMessage}> Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

// import ChatRoom from './components/ChatRoom';

// export default function App () {
//   return(
//     <ChatRoom />
//   );
// }
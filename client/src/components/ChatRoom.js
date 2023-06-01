import React from 'react';
import io from 'socket.io-client';
// Importing useEffect Hook
import { useEffect, useState } from 'react';

//Testing chatroom functionality from events
// function ChatRoom() {
//   const messages = [
//     { sender: 'Ryan', text: 'Hello everyone!' },
//     { sender: 'Reese', text: 'Yo' },
//     { sender: 'Derrick', text: "Sup" },
//     { sender: 'Haley', text: "We out here" },
//     { sender: 'Michael', text: "Hi" },
//   ];

//   return (
//     <div>
//       <h1>Chat Room</h1>
//       <MyEvents messages={messages} />
//     </div>
//   );
// }


// function ChatRoom() {
//     const [messages, setMessages] = useState([]);
//     const socket = io('http://localhost:3001'); // Replace with your server URL
  
//     useEffect(() => {
//       // Set up event listeners
//       socket.on('chatMessage', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
  
//       // Clean up the socket.io connection and event listeners
//       return () => {
//         socket.disconnect();
//       };
//     }, []);
  
//     const handleSendMessage = (message) => {
//       socket.emit('chatMessage', message);
//     };
  
//     return (
//       <div>
//         <h1>Chat Room</h1>
//         <MyEvents messages={messages} />
//         <ChatForm onSendMessage={handleSendMessage} />
//       </div>
//     );
//   }
  

function ChatRoom() {
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
      // setMessageReceived(data.message);
      setMessageReceived((prevMessages) => [...prevMessages, data.message])
    })
  }, [socket]);

  return(
    <div className="App">
      <input placeholder='Room Number...' onChange={(event) => {
        setRoom(event.target.value);
      }}/>
      <button onClick={joinRoom}>Join Room</button>
      <input placeholder="Message..." onChange={() => {
        //Grabbing the message value and setting it to the new message
        setMessage(event.target.value);
      }}/>
      <button onClick={sendMessage}> Send Message</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default ChatRoom;



// import io from 'socket.io-client';
// // Importing useEffect Hook
// import { useEffect, useState } from 'react';

// //Testing chatroom functionality from events
// // function ChatRoom() {
// //   const messages = [
// //     { sender: 'Ryan', text: 'Hello everyone!' },
// //     { sender: 'Reese', text: 'Yo' },
// //     { sender: 'Derrick', text: "Sup" },
// //     { sender: 'Haley', text: "We out here" },
// //     { sender: 'Michael', text: "Hi" },
// //   ];

// //   return (
// //     <div>
// //       <h1>Chat Room</h1>
// //       <MyEvents messages={messages} />
// //     </div>
// //   );
// // }


// // function ChatRoom() {
// //     const [messages, setMessages] = useState([]);
// //     const socket = io('http://localhost:3001'); // Replace with your server URL

// //     useEffect(() => {
// //       // Set up event listeners
// //       socket.on('chatMessage', (message) => {
// //         setMessages((prevMessages) => [...prevMessages, message]);
// //       });

// //       // Clean up the socket.io connection and event listeners
// //       return () => {
// //         socket.disconnect();
// //       };
// //     }, []);

// //     const handleSendMessage = (message) => {
// //       socket.emit('chatMessage', message);
// //     };

// //     return (
// //       <div>
// //         <h1>Chat Room</h1>
// //         <MyEvents messages={messages} />
// //         <ChatForm onSendMessage={handleSendMessage} />
// //       </div>
// //     );
// //   }

// const socket = io.connect("http://localhost:3000");

// function ChatRoom() {
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");
//   const [room, setRoom] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       //emit the room that the user writes to the room useState
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     //This message is emitted to the backend
//     //The message will be from the useState so it takes the message and the specific room
//     socket.emit("send_message", { message, room });
//   };

//   //Listening to the broadcast event (whenever an event is emitted the function will run again)
//   useEffect(() => {
//     //Listening to event receive_message incase it happens
//     socket.on("receive_message", (data) => {
//       //This grabs the current message inputted
//       // setMessageReceived(data.message);
//       setMessageReceived((prevMessages) => [...prevMessages, data.message])
//     })
//   }, [socket]);

//   return(
//     <div className="App">
//       <input placeholder='Room Number...' onChange={(event) => {
//         setRoom(event.target.value);
//       }}/>
//       <button onClick={joinRoom}>Join Room</button>
//       <input placeholder="Message..." onChange={() => {
//         //Grabbing the message value and setting it to the new message
//         setMessage(event.target.value);
//       }}/>
//       <button onClick={sendMessage}> Send Message</button>
//       <h1>Message:</h1>
//       {messageReceived}
//     </div>
//   );
// }

// export default ChatRoom;


import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

//Takes socket, the username of the person and the room
function ChatRoom({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState('');
  //We want to add a new message to the array
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      // taking in all the messages in an object to send back the object later
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        // gets the current hour and minutes
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
     // it sets the message list array to whatever is inputted along with the previous list information
      setMessageList((list) => [...list, messageData]);
    }
  }


  //Listening from the front end to send stuff to the back end
  //This function will be called when ever there is a change in our socket server
  useEffect(() => {
    //Listening for the emit in the server
    socket.on('receive_message', (data) => {
      // Whenever a message is sent
      // it sets the message list array to whatever is inputted along with the previous list information
      setMessageList((list) => [...list, data]);
    });

  }, [socket]);

  return (
    <>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {messageList.map((messageContent) => {

          // Content 
          // const messageData = {
          //   room: room,
          //   author: username,
          //   message: currentMessage,
      
          //   time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
          // }

          //So we are only taking the message (currentMessage)
          return(
            //Creating the id other and you to use in css
            <div className='message-container' id={username === messageContent.author ? "you" : "other"} key={messageContent.id}>
              <div> 
                <div className='message-content'> 
                  <p>{messageContent.message}</p>
                </div>
                <div className='message-meta'> 
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
              </div>
          );
        }) }
      </div>
      <div className='chat-footer'>
        <input type='text' placeholder='Message Here...'
          // set current message to the value
          onChange={(event) => { setCurrentMessage(event.target.value)}}
          onKeyDown={(event) => { event.key === "Enter" && sendMessage(); }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </>
  );
}

//Declaring the prop types
ChatRoom.propTypes = {
  socket: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
};

export default ChatRoom;
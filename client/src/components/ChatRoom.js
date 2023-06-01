import React from 'react';
import io from 'socket.io-client';
import { Events as MyEvents } from './MyEvents';

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


function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:3001'); // Replace with your server URL
  
    useEffect(() => {
      // Set up event listeners
      socket.on('chatMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
  
      // Clean up the socket.io connection and event listeners
      return () => {
        socket.disconnect();
      };
    }, []);
  
    const handleSendMessage = (message) => {
      socket.emit('chatMessage', message);
    };
  
    return (
      <div>
        <h1>Chat Room</h1>
        <MyEvents messages={messages} />
        <ChatForm onSendMessage={handleSendMessage} />
      </div>
    );
  }
  
export default ChatRoom;



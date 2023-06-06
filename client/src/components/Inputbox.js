import io from 'socket.io-client';
// Use this to emit events whenever we need
const socket = io.connect("http://localhost:3000");
// Importing useEffect Hook
import { useEffect, useState } from 'react';

const Inputbox = () => {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

    const sendMessage = () => {
        socket.emit("send_message", { message });
      };
    
      useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageReceived(data.message);
        })
      }, []);

  return (
    <>
      {/* Where messages show */}
      <h1>Message:</h1>
      {messageReceived}

      {/* message form */}
      <footer className='absolute justify-center inset-x-50 bottom-0'>
      <input placeholder="Message..." onChange={() => {
        //Grabbing the message value and setting it to the new message
        setMessage(event.target.value);
      }}/>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm 
      font-semibold text-white shadow-sm hover:bg-indigo-500 
      focus-visible:outline 
      focus-visible:outline-2 focus-visible:outline-offset-2 
      focus-visible:outline-indigo-600" 
      onClick={sendMessage}> Send Message</button>
      </footer>
      </>
  )
}

export default Inputbox
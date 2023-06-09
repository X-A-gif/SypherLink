import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERNAME } from '../utils/queries.js';
import { SAVE_CHAT } from '../utils/mutations.js';
import Logo from '../assets/test-sypherlink-logo.svg'; //Logo

import SideBar from './SideBar.js';

//Takes socket, the username of the person and the room
function ChatRoom({ socket, room }) {

  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const { loading, error, data } = useQuery(GET_USERNAME);

  // Mutation to save the chat
  const [saveChat, { rError, rData }] = useMutation(SAVE_CHAT);

  //Listening from the front end to send stuff to the back end
  //This function will be called when ever there is a change in our socket server
  useEffect(() => {
    // Remove the previous event listener, if any
    socket.off("receive_message");

    //Listening for the emit in the server
    socket.on("receive_message", (data) => {
      // Whenever a message is sent
      // it sets the message list array to whatever is inputted along with the previous list information
      console.log("Received message:", data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  const username = data && data.username.username ? data.username.username : "";

  const sendMessage = async () => {
    if (currentMessage !== "") {
      // taking in all the messages in an object to send back the object later
      const messageData = {
        id: uuidv4(),
        room: room,
        author: username,
        message: currentMessage,
        // gets the current hour and minutes
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
      
      // Save the chat message to the server
      console.log(room)
      await saveChat({ variables: { chat: currentMessage, sentBy: username, roomID: room } });
    }
  };

  return (
     <>
      <div className="chat-header absolute text-black left-0 right-0 grid place-items-center mt-[-80px]">
        <div className='flex justify-center items-center w-64 h-64'>
          <img src={Logo} className='w-64 h-64' />
        </div>
      </div>
      {/* <SideBar /> */}
      <div className="absolute bottom-0 left-0 right-0 grid place-items-center">
        {/* <div className='chat-header'>
        <p>Live Chat</p>
      </div> */}
        <div className="chat-body w-3/5">
          <ScrollToBottom>
            {messageList.map((messageContent) => {
              
       
              //So we are only taking the message (currentMessage)
              return (
                //Creating the id other and you to use in css
                <div className='message-container' id={username === messageContent.author ? "you" : "other"} key={messageContent.id}>
                  <div className='py-3'>
                    <div className=' bg-slate-500 p-3 rounded-lg'>
                      <div className='message-content'>
                        <p className='text-4xl left-30 bottom-0 text-white'>{messageContent.message}</p>
                      </div>
                      <div className='mt-2 message-meta flex flex-row'>
                        <p id="author" className='text-white flex-grow'>{messageContent.author}</p>
                        <p id="time" className='text-white text-right'>{messageContent.time}</p>
                      </div>


                    </div>
                  </div>
                </div>
              );
            })}
            {/* You need to specify the css properties for this, this is to let the page scroll down automatically when a new message is sent */}
          </ScrollToBottom>
        </div>
        <div className="chat-footer w-full mx-auto xl:pl-20 lg:pl-17 md:pl-15 sm:pl-12 xs:pl-8 bg-slate-900">
          <input
            type="text"
            className="w-5/6 rounded-l-lg py-2 bg-slate-700 text-white"
            value={currentMessage}
            placeholder=" Message Here..."
            // set current message to the value
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button
            className="rounded-r-lg bg-indigo-600 px-3 py-3 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
} 

//Declaring the prop types
ChatRoom.propTypes = {
  socket: PropTypes.object.isRequired,
  room: PropTypes.string.isRequired,
};

export default ChatRoom;

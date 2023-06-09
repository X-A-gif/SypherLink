import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERNAME } from '../utils/queries.js';
import { SAVE_CHAT } from '../utils/mutations.js';

import SideBar from './SideBar.js';

function ChatRoom({ socket, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const { loading, error, data } = useQuery(GET_USERNAME);

  // Mutation to save the chat
  const [saveChat, { rError, rData }] = useMutation(SAVE_CHAT);

  useEffect(() => {
    socket.off('receive_message');
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const username = data && data.username.username ? data.username.username : '';

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        id: uuidv4(),
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');

       // Save the chat message to the server
      await saveChat({ variables: { chat: currentMessage, sentBy: username } });
    }
  };

  return (
    <>
      <div className='chat-header absolute text-black left-0 right-0 grid place-items-center'>
        <p className='text-3xl'>Live Chat</p>
      </div>
      <SideBar />
      <div className='absolute bottom-0 left-0 right-0 grid place-items-center'>
        {/* <div className='chat-header'>
        <p>Live Chat</p>
      </div> */}
        <div className='chat-body w-3/5'>
          <ScrollToBottom>
            {messageList.map((messageContent) => {
              
       
              //So we are only taking the message (currentMessage)
              return (
                //Creating the id other and you to use in css
                <div className='message-container' id={username === messageContent.author ? "you" : "other"} key={messageContent.id}>
                  <div className='py-3'>
                    <div className=' bg-slate-500 p-3 rounded-lg'>
                      <div className='message-content'>
                        <p id="author" className='text-5xl text-white font-semibold'>{messageContent.author}</p>
                        <p className='text-4xl left-30 bottom-0 text-white'>{messageContent.message}</p>
                      </div>
                      <div className='message-meta'>
                        <p id="time" className='text-white' >{messageContent.time}</p>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
            {/* You need to specify the css properties for this, this is to let the page scroll down automatically when a new message is sent */}
          </ScrollToBottom>
        </div>
        <div className='chat-footer w-full mx-auto pl-20 bg-slate-900'>
          <input type='text' className='w-5/6 rounded-l-lg py-2 bg-slate-700 text-white'
            value={currentMessage}
            placeholder=' Message Here...'
            // set current message to the value
            onChange={(event) => { setCurrentMessage(event.target.value) }}
            onKeyDown={(event) => { event.key === "Enter" && sendMessage(); }}
          />
          <button className="rounded-r-lg bg-indigo-600 px-3 py-3 text-sm 
        font-semibold text-white shadow-sm hover:bg-indigo-500 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        focus-visible:outline-indigo-600" onClick={sendMessage}>Send</button>
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
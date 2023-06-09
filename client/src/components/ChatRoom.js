import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CHATS, GET_USERNAME } from '../utils/queries.js';
import { SAVE_CHAT } from '../utils/mutations.js';

import SideBar from './SideBar.js';

function ChatRoom({ socket, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const { loading, error, data } = useQuery(GET_USERNAME);

  // Mutation to save the chat
  const [saveChat, { rError, rData }] = useMutation(SAVE_CHAT);

  const { loading: chatsLoading, error: chatsError, data: chatsData } = useQuery(GET_CHATS, {
    variables: { roomID: room },
  });

  useEffect(() => {
    socket.off('receive_message');
    socket.on('receive_message', (data) => {
      console.log('Received message:', data);
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    if (chatsLoading || chatsError) {
      return;
    }

    const chats = chatsData && chatsData.chats ? chatsData.chats : [];
    setMessageList(chats);
  }, [chatsLoading, chatsError, chatsData]);

  const sendMessage = async () => {
    // Rest of the code remains the same...
  };

  if (loading || chatsLoading) {
    return <p>Loading...</p>;
  }

  if (error || chatsError) {
    return <p>Error: {error?.message || chatsError?.message}</p>;
  }

  const username = data && data.username.username ? data.username.username : '';


  return (
    <>
      <div className='chat-header absolute text-black left-0 right-0 grid place-items-center'>
        <p className='text-3xl'>Live Chat</p>
      </div>
      <SideBar />
      <div className='absolute bottom-0 left-0 right-0 grid place-items-center'>
        <div className='chat-body w-3/5'>
          <ScrollToBottom className='message-container'>
            {/* Display the chat messages */}
            {messageList.map((messageContent) => (
              <div
                className={`message-container ${username === messageContent.author ? 'you' : 'other'}`}
                key={messageContent.id}
              >
                <div className='py-3'>
                  <div className=' bg-slate-500 p-3 rounded-lg'>
                    <div className='message-content'>
                      <p id='author' className='text-5xl text-white font-semibold'>
                        {messageContent.author}
                      </p>
                      <p className='text-4xl left-30 bottom-0 text-white'>{messageContent.message}</p>
                    </div>
                    <div className='message-meta'>
                      <p id='time' className='text-white'>
                        {messageContent.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <div className='chat-footer w-full mx-auto pl-20 bg-slate-900'>
          <input
            type='text'
            className='w-5/6 rounded-l-lg py-2 bg-slate-700 text-white'
            value={currentMessage}
            placeholder='Message Here...'
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === 'Enter' && sendMessage();
            }}
          />
          <button
            className='rounded-r-lg bg-indigo-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
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
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ScrollToBottom from 'react-scroll-to-bottom';
import { v4 as uuidv4 } from 'uuid';

//Takes socket, the username of the person and the room
function ChatRoom({ socket, username, room }) {

  const [currentMessage, setCurrentMessage] = useState('');
  //We want to add a new message to the array
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      // taking in all the messages in an object to send back the object later
      const messageData = {
        id: uuidv4(), //Generates a unique ID
        room: room,
        author: username,
        message: currentMessage,
        // gets the current hour and minutes
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData);
      // it sets the message list array to whatever is inputted along with the previous list information
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("")
    }
  };


  //Listening from the front end to send stuff to the back end
  //This function will be called when ever there is a change in our socket server
  useEffect(() => {

    // Remove the previous event listener, if any
    socket.off('receive_message');

    //Listening for the emit in the server
    socket.on('receive_message', (data) => {
      // Whenever a message is sent
      // it sets the message list array to whatever is inputted along with the previous list information
      console.log('Received message:', data);
      setMessageList((list) => [...list, data]);
    });

  }, [socket]);

  return (
    <>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom>
          {messageList.map((messageContent) => {

            // Content 
            // const messageData = {
            //   room: room,
            //   author: username,
            //   message: currentMessage,

            //   time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            // }

            //So we are only taking the message (currentMessage)
            return (
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
          })}
          {/* You need to specify the css properties for this, this is to let the page scroll down automatically when a new message is sent */}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input type='text'
          value={currentMessage}
          placeholder='Message Here...'
          // set current message to the value
          onChange={(event) => { setCurrentMessage(event.target.value) }}
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
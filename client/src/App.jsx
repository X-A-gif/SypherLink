import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';

const socket = io.connect('http://localhost:3001');

export default function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              showChat ? (
                <ChatRoom socket={socket} username={username} room={room} />
              ) : (
                <div className='join-chat-container'>
                  <h3>Join Chat</h3>
                  <hr></hr>
                  <input
                    type="text"
                    placeholder='Name'
                    onChange={(event) => { setUsername(event.target.value) }}
                  />
                  <hr></hr>
                  <input
                    type="text"
                    placeholder='Room ID..'
                    onChange={(event) => { setRoom(event.target.value) }}
                  />
                  <hr></hr>
                  <button onClick={joinRoom}>Join a room</button>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

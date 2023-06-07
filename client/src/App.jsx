import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import auth from './utils/auth';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

console.log(auth);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const socket = io.connect('http://localhost:3001');

export default function App() {
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
      setShowChat(true);
    }
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                showChat ? (
                  <ChatRoom socket={socket}  room={room} />
                ) : (
                  <div className='join-chat-container'>
                    <h3>Join Chat</h3>
                   
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
    </ApolloProvider>
  );
}

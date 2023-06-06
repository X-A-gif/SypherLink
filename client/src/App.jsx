import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USERNAME } from './utils/queries';

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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const socket = io.connect('http://localhost:3001');

export default function App() {
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const { loading, error, data } = useQuery(GET_USERNAME);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  const username = data && data.username ? data.username : '';

  console.log(username);
  
  const joinRoom = () => {
    if (auth.logged && room !== '') {
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
                  <ChatRoom socket={socket} username={username} room={room} />
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

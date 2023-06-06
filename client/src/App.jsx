import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/Login';

//-----------------------------------------------------------------------
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


//-----------------------------------------------------------------------

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
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

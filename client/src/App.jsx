import io from 'socket.io-client';
import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './utils/auth';


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


export default function App() {

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}



 // <div className='join-chat-container'>
                  //   <h3>Join Chat</h3>
                   
                  //   <input
                  //     type="text"
                  //     placeholder='Room ID..'
                  //     onChange={(event) => { setRoom(event.target.value) }}
                  //   />
                  //   <hr></hr>
                  //   <button onClick={joinRoom}>Join a room</button>
                  // </div>
import React from 'react';

function App() {
  return (
    <div>
      <ul id="messages"></ul>
      <form id="form" action="" className="fixed bottom-0 left-0 right-0 flex h-12 bg-opacity-40 backdrop-filter backdrop-blur-md">
        <input id="input" autoComplete="off" className="border-none px-4 flex-grow rounded-l-md my-1" />
        <button className="bg-gray-700 text-white px-4 rounded-r-md my-1">Send</button>
      </form>
    </div>
  );
}

export default App;

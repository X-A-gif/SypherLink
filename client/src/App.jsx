// Use this to emit events whenever we need
// Importing useEffect Hook
import SideBar from './components/SideBar';
import Inputbox from './components/Inputbox';
import Joinbox from './components/Joinbox';

export default function App() {

  return(
    <div className="App">
      <div className='flex h-20'>
      <SideBar/>
      <Joinbox/>
      <Inputbox/>
    </div>
    </div>
    
  );
}

// import ChatRoom from './components/ChatRoom';

// export default function App () {
//   return(
//     <ChatRoom />
//   );
// }
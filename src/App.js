import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Player from './pages/Player';
import Nopage from './pages/Nopage';
import Mainpage from './pages/Mainpage';


function App() {
  return (
    <div className="App">
  <h1>Hello</h1>
   <Mainpage/>
   <BrowserRouter>
          <Routes>
         
             <Route  path='/page1' element={<Player/>} />
          

            Video-Player
           {/* <Route  path='/*' element={<Nopage/>} />  */}

          </Routes>
          </BrowserRouter>
        
  
      
    </div>
  );
}

export default App;

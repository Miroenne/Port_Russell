import Home from './pages/Home';
import Login from './pages/Login';
/*import Nav from './components/Nav';
import Services from './pages/Services';
import Achievements from './pages/Achievements';
import Mentions from './pages/Mentions';
import Contact from './pages/Contact';
import Footer from './components/Footer'*/
import {Routes, Route} from "react-router-dom"

import './App.css';

function App() {
  return (
    <div className="App">      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        {/*<Route path="/Services" element={<Services/>}/>
        <Route path="/Achievements" element={<Achievements/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/Mentions" element={<Mentions/>}/>*/}
      </Routes>
    </div>
  );
}

export default App;

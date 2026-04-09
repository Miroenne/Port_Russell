import Home from './pages/Home';
import Login from './pages/Login';
import Readme from './pages/Readme';
import AuthLayout from './pages/AuthLayout';
import MainLayout from './pages/MainLayout';
/*import Services from './pages/Services';
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
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login/>}/>
          <Route path='/Readme' element={<Readme/>}/>
        </Route> 
        <Route element={<MainLayout />}>
          <Route path='/home' element={<Home/>}/>
          {/*<Route path="/Services" element={<Services/>}/>
          <Route path="/Achievements" element={<Achievements/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Mentions" element={<Mentions/>}/>*/}
        </Route>       
        
      </Routes>
    </div>
  );
}

export default App;

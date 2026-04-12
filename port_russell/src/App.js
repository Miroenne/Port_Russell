import Home from './pages/Home';
import Login from './pages/Login';
import Readme from './pages/Readme';
import Users from './pages/Users';
import Confirm from './pages/Confirm';
import AuthLayout from './pages/AuthLayout';
import MainLayout from './pages/MainLayout';
import ProtectedRoute from './pages/ProtectedRoute';
/*import Services from './pages/Services';
import Achievements from './pages/Achievements';
import Mentions from './pages/Mentions';
import Contact from './pages/Contact';
import Footer from './components/Footer'*/
import {Routes, Route} from "react-router-dom"

import './App.css';

function App() {

  const isAuthenticated = !!sessionStorage.getItem('user');

  return (
    <div className="App">    
           
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login/>}/>
          <Route path='/Readme' element={<Readme/>}/>
          <Route path='/Confirm' element={<Confirm/>}/>
        </Route> 
        <Route element={<MainLayout />}>
          <Route path='/home' element={ProtectedRoute({ children: <Home />, isAuthenticated })}/>
          <Route path="/users" element={ProtectedRoute({ children: <Users />, isAuthenticated })}/>
         {/* <Route path="/Achievements" element={<Achievements/>}/>
          <Route path="/Contact" element={<Contact/>}/>
          <Route path="/Mentions" element={<Mentions/>}/>*/}
        </Route>       
        
      </Routes>
    </div>
  );
}

export default App;

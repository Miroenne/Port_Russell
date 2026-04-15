import Home from './pages/Home';
import Login from './pages/Login';
import Readme from './pages/Readme';
import Users from './pages/Users';
import Reservations from './pages/Reservations';
import Catways from './pages/Catways';
import Confirm from './pages/Confirm';
import AuthLayout from './pages/AuthLayout';
import MainLayout from './pages/MainLayout';
import ProtectedRoute from './pages/ProtectedRoute';
import {Routes, Route} from "react-router-dom"

import './App.css';

/**
 * Main Application Component
 * Defines the routing architecture of the application, including public routes,
 * layout wrappers, and protected access logic.
 */
function App() {

  /**
   * Simple Authentication Check:
   * Determines if a user is logged in by checking the presence of a 'user' 
   * object in sessionStorage. The '!!' operator converts the result to a boolean.
   */
  const isAuthenticated = !!sessionStorage.getItem('user');

  return (
    <div className="App">    
           
      <Routes>
        {/* AUTH LAYOUT GROUP 
            Contains public or semi-public routes that don't require the main navbar.
        */}        
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login/>}/>
          <Route path='/Readme' element={<Readme/>}/>
          <Route path='/Confirm' element={<Confirm/>}/>
        </Route> 

        {/* MAIN LAYOUT GROUP (Authenticated area)
            Wraps internal pages with a consistent Navigation Bar.
            Access to these routes is strictly controlled via the ProtectedRoute guard.
        */}
        <Route element={<MainLayout />}>

          {/* Dashboard route */}
          <Route path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>}/>

          {/* User management route */}
          <Route path="/users" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Users /></ProtectedRoute>}/>

          {/* Reservations management route */}
          <Route path="/reservations" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Reservations /></ProtectedRoute>}/>

          {/* Catway management route */}
          <Route path="/catways" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Catways /></ProtectedRoute>}/>      
          
        </Route>       
        
      </Routes>
    </div>
  );
}

export default App;

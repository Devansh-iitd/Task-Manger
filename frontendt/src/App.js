import React from 'react';
import './App.css';
import Nav from './components/navbar';

import Home from './pages/Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/login';

function App() {
  return (
    <div className="App">

      
    
      <Router>
        <Nav />
        <Routes>
       
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;

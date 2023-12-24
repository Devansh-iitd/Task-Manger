import React from 'react';
import './App.css';
import Nav from './components/navbar';

import Home from './pages/Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/login';
import Tasks from './pages/Tasks';
import AddTask from './pages/addTask';
import Social from './pages/Social';
import Task from './pages/Task';
import { useEffect } from 'react';



function App() {

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('unload', handleBeforeUnload);

    return () => {
      window.removeEventListener('unload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="App ">
      

      
    
      <Router>
        <Nav />
        <Routes>
       
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/tasks/addTask' element={<AddTask />} />
          <Route path='/social' element = {<Social  />} />
          <Route path='tasks/:id' element={<Task/>} />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;

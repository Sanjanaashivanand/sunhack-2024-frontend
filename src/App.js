import { useState, useEffect} from 'react';
import Login from './Components/Login/Login.js'
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Survey from './Components/Survey/Survey.js';
import Dashboard from './Components/Dashboard/Dashboard.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/survey' element={<Survey/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}


export default App;

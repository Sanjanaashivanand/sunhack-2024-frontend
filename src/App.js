import { useState, useEffect} from 'react';
import Login from './Components/Login/Login.js'
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Survey from './Components/Survey/Survey.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/survey' element={<Survey/>}/>
      </Routes>
    </Router>
  );
}

export default App;

import { useState, useEffect} from 'react';
import Login from './Components/Login/Login.js'
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;

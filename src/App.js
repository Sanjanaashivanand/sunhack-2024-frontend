import { useState, useEffect} from 'react';
import Login from './Components/Login/Login.js'
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Survey from './Components/Survey/Survey.js';
import Dashboard from './Components/Dashboard/Dashboard.js';

function App() {
  return (
    <Router>
      <div className='app-container'>
        <div className='column song-recommendations'>
          <h2>Your recommended songs based on your mood</h2>
          <div className='songs-container'>
            {[...Array(10)].map((_, index) => (
              <div key={index} className='song-box'>
                <img src={playButton} alt="play" className="play-button" />
                <span className="song-name">Spotify Song {index + 1}</span>
              </div>
            ))}
          </div>
          <button className='next-button'>Next</button>
        </div>
        
        <div className='column chatbot'>
          <h2>Chatbot</h2>
          <div className='chat-container'>
            {/* Chatbot messages will go here */}
          </div>
          <div className='chat-input' id="chat-input">
            {/*API endpoint needs to be added here to send to /chatbot*/}
            <input type='text' placeholder='What is on your mind?' /> 
            <button id="chatbot-button">Send</button>
          </div>
        </div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path='/survey' element={<Survey/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}


export default App;

import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton, TextField, Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SendIcon from '@mui/icons-material/Send';
import "./Dashboard.css";
import {getMood} from "../../backend.js"

// Sample music recommendation component
const MusicRecommendation = () => {
  const [isPlaying, setIsPlaying] = useState(null);

  // Sample music recommendations
  const recommendations = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 2, title: "Levitating", artist: "Dua Lipa" },
    { id: 3, title: "Good 4 U", artist: "Olivia Rodrigo" },
    { id: 4, title: "Peaches", artist: "Justin Bieber" },
    { id: 5, title: "Save Your Tears", artist: "The Weeknd" }
  ];

  const handlePlayPause = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  return (
    <div className="music-recommendation">
      <Typography variant="h4" className="heading">Your recommended songs based on your current mood</Typography>
      <Typography variant="h6" className="subheading">
        Hit the like button, if the song resonates with your mood!
      </Typography>
      <div className="recommendation-list">
        {recommendations.map((track) => (
          <Card key={track.id} className="track-card">
            <CardContent className="track-content">
              <div>
                <Typography variant="h6" className="track-title">{track.title}</Typography>
                <Typography variant="body2" color="textSecondary" className="track-artist">{track.artist}</Typography>
              </div>
              <IconButton onClick={() => handlePlayPause(track.id)} className="play-btn">
                {isPlaying === track.id ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Simple chatbot component
const Chatbot = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" };
  
      // Update chat messages with the new user message
      setChatMessages((prevMessages) => {
        const newMessages = [...prevMessages, userMessage];
        console.log("CHAT MESSAGE", userMessage);
        getMood(userMessage);
        
        // Simulate bot response
        setTimeout(() => {
          setChatMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
            { text: "Hello! How can I assist you?", sender: "bot" }
          ]);
        }, 1000);
        
        return newMessages;
      });
  
      setMessage("");
    }
  };

  return (
    <div className="chatbot">
      <Typography variant="h6" className="chat-heading">Chat with MusicBot</Typography>
      <div className="chat-messages">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input-field"
        />
        <Button
          onClick={sendMessage}
          variant="contained"
          color="primary"
          className="send-btn"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="music-recommendation-container">
        <MusicRecommendation />
      </div>

      <div className="chatbot-container">
        <Chatbot />
      </div>
    </div>
  );
}

export default Dashboard;

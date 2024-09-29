import React, { useState, useEffect } from "react"; 
import { Card, CardContent, Typography, IconButton, Grid, Box } from "@mui/material";
import {TextField, Button } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Dashboard.css";
import { getInitial, refreshRecommendations } from "../../backend";

// Sample music recommendation component
const MusicRecommendation = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [initialRecommendations, setInitialRecommendations] = useState([]);
  const [likedSongs, setLikedSongs] = useState(
    JSON.parse(localStorage.getItem("likedSongs")) || []
  );

  useEffect(() => {
    getInitial(4)
    .then((data) => {
      console.log("RECEIVED",data.initial_recommendations);
      setInitialRecommendations(data.initial_recommendations);
    })
  }, []);

  useEffect(() => {
    if (likedSongs.length > 0) {
      console.log("Liked Songs:", likedSongs);
    }
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const handlePlayPause = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  const handleLikeToggle = (id) => {
    if (likedSongs.includes(id)) {
      setLikedSongs(likedSongs.filter(trackId => trackId !== id));  // Remove if already liked
    } else {
      setLikedSongs([...likedSongs, id]);
    }
    console.log(likedSongs)
  };

  const Refresh = async () => {
    if (likedSongs.length > 0) {
      // Save liked songs to localStorage
      localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
      
      // Prepare feedback data
      const user_id = 4;  // Example user_id
      const feedback = likedSongs.map(songId => ({
        song_id: songId,
        reward: 1,  // Assuming all liked songs have reward = 1
        mood: 'Angry'  // Example mood, replace with dynamic mood if needed
      }));
      
      try {
        // Call the refreshRecommendations function
        const data = await refreshRecommendations(user_id, feedback);
        console.log("REFRESHED", data);
        setInitialRecommendations(data.new_recommendations);   // Log the refreshed recommendations
      } catch (error) {
        console.error("Error during refresh:", error);  // Handle any errors
      }
    } else {
      console.log("No liked songs to refresh.");
    }
  };
  
  
  

  return (
    <div className="music-recommendation">
      
      <Typography variant="h4" className="heading">Your recommended songs based on your current mood</Typography>
      <Typography variant="h6" className="subheading">
        Hit the like button, if the song resonates with your mood!
      </Typography>
      <Button 
  variant="contained" 
  color="primary" 
  className="refresh-btn" 
  onClick={() => Refresh()}
>
  Refresh
</Button>
      <div className="recommendation-list">
        {initialRecommendations.slice(0,5).map((track) => (
          <Card key={track.track_id} className="track-card">
            <CardContent className="track-content">
              <div>
                <Typography variant="h6" className="track-title">{track.track_name}</Typography>
                <Typography variant="body2" color="textSecondary" className="track-artist">{track.artist_name}</Typography>
              </div>
              <IconButton onClick={() => handlePlayPause(track.track_id)} className="play-btn">
                {isPlaying === track.track_id ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => handleLikeToggle(track.track_id)} className="heart-btn">
                {/* Conditionally render heart or unheart based on liked state */}
                {likedSongs.includes(track.track_id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
      setChatMessages([...chatMessages, { text: message, sender: "user" }]);
      
      setMessage("");

      // Simulate bot response
      setTimeout(() => {
        setChatMessages([...chatMessages, { text: message, sender: "user" }, { text: "Hello! How can I assist you?", sender: "bot" }]);
      }, 1000);
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

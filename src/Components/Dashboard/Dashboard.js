import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, IconButton, Button, TextField, Grid, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Dashboard.css";
import { getInitial, getMood, refreshRecommendations } from "../../backend";

const Dashboard = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [initialRecommendations, setInitialRecommendations] = useState([]);
  const [likedSongs, setLikedSongs] = useState(JSON.parse(localStorage.getItem("likedSongs")) || []);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userMood, setUserMood] = useState("Neutral");
  const [responseCount, setResponseCount] = useState(0);  // Keep track of bot responses

  useEffect(() => {
    getInitial(20).then((data) => {
      setInitialRecommendations(data.initial_recommendations);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const handlePlayPause = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  const handleLikeToggle = (id) => {
    if (likedSongs.includes(id)) {
      setLikedSongs(likedSongs.filter(trackId => trackId !== id));
    } else {
      setLikedSongs([...likedSongs, id]);
    }
  };

  const Refresh = async () => {
    if (likedSongs.length > 0) {
      const user_id = 16;
      const feedback = likedSongs.map(songId => ({
        song_id: songId,
        reward: 1,
        mood: userMood,
      }));

      try {
        const data = await refreshRecommendations(user_id, feedback);
        setInitialRecommendations(data.new_recommendations);
      } catch (error) {
        console.error("Error during refresh:", error);
      }
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      // Add user message to the chat
      setChatMessages([...chatMessages, { text: message, sender: "user" }]);
      setMessage("");
  
      // Get user mood and handle possible errors
      getMood(4, message)
        .then((data) => {
          // Check if data contains the 'mood' property
          if (data && data.mood) {
            setUserMood(data.mood);
          } else {
            // Fallback if mood is not returned
            setUserMood("Neutral");
            console.error("Mood property not found in response");
          }
        })
        .catch((error) => {
          // Handle any errors from the API call
          setUserMood("Neutral");
          console.error("Error fetching mood:", error);
        });
  
      setTimeout(() => {
        // Alternate the chatbot response based on the response count
        setChatMessages((prevMessages) => [
          ...prevMessages,
          responseCount % 2 === 0
            ? { text: "Hello! Tell me how you are feeling today, and I can curate a special playlist for you", sender: "bot" }
            : { text: "Sure, here are some recommendations. Please refresh!!", sender: "bot" }
        ]);
  
        // Increment the response count after each bot message
        setResponseCount(prevCount => prevCount + 1);
      }, 1000);
    }
  };
  

  return (
    <Grid
      container
      spacing={2}
      style={{
        height: '100vh',
        margin: 0,
        padding: '10px',
        background: 'linear-gradient(90deg, rgba(187,208,255,1) 0%, rgba(213,199,254,1) 50%, rgba(231,198,255,1) 100%)',
      }}
    >
      {/* Left Part - Music Recommendation */}
      <Grid item xs={7} style={{ maxHeight: '100vh' }}>
        <Typography variant="h4" style={{ marginBottom: '1rem', fontWeight: 'bold', color: '#4A4A4A' }}>
          Your Recommended Songs
        </Typography>
        <Typography variant="subtitle1" style={{ marginBottom: '1rem', color: '#6D6D6D' }}>
          Hit the like button if the song resonates with your mood!
        </Typography>
        <Box display="flex" justifyContent="flex-end" style={{ marginBottom: '1rem' }}>
          <Button variant="contained" style={{backgroundColor: '#ff028d'}} onClick={Refresh}>Refresh</Button>
        </Box>
        
        {/* Scrollable Box for Songs */}
        <Box
          style={{
            maxHeight: '70vh', // Limit the height
            overflowY: 'auto', // Enable vertical scroll
            paddingRight: '10px', // To avoid the scrollbar overlapping content
            scrollbarWidth: 'thin', // Smaller scrollbar for aesthetic
          }}
        >
          <Grid container spacing={2}>
            {initialRecommendations.map((track) => (
              <Grid item xs={6} key={track.track_id}>
                <Card
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#333333',
                    padding: '1rem',
                    borderRadius: '20px', // Softer rounded corners
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'transform 0.2s', // Smooth hover effect
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box>
                      <Typography variant="h6" style={{ fontWeight: 'bold' }}>{track.track_name}</Typography>
                      <Typography variant="body2" color="textSecondary">{track.artist_name}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                    <a href={`https://open.spotify.com/track/${track.track_id}`} target="_blank" rel="noopener noreferrer">
                      <IconButton onClick={() => handlePlayPause(track.track_id)}>
                        {isPlaying === track.track_id ? <PauseIcon /> : <PlayArrowIcon />}
                      </IconButton>
                    </a>
                      <IconButton onClick={() => handleLikeToggle(track.track_id)}>
                        {likedSongs.includes(track.track_id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>

      {/* Right Part - Chatbot */}
      <Grid item xs={5}>
        <Box 
          p={2} 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.1)', 
            borderRadius: '15px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" gutterBottom>Chat with MusicBot</Typography>
          <Box style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem' }}>
            {chatMessages.map((msg, index) => (
              <Box
                key={index}
                mb={1}
                p={1}
                style={{
                  backgroundColor: msg.sender === "user" ? "#2196f3" : "#eceff1",
                  color: msg.sender === "user" ? "white" : "black",
                  borderRadius: '10px',
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                {msg.text}
              </Box>
            ))}
          </Box>
          <Box display="flex" alignItems="center">
            <TextField
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
              style={{ marginRight: '0.5rem', backgroundColor: 'white' }}
            />
            <Button
              onClick={sendMessage}
              variant="contained"
              style={{backgroundColor: '#ff028d'}}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
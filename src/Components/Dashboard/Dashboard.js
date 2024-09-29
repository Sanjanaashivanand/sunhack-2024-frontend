import React, { useState } from "react"; 
import { Card, CardContent, Typography, IconButton, Grid, Box } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./Dashboard.css";

// Sample music recommendation component
const MusicRecommendation = () => {
  const [isPlaying, setIsPlaying] = useState(null);
  const [likedTracks, setLikedTracks] = useState([]);

  // Updated recommendations with 10 songs
  const recommendations = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd" },
    { id: 2, title: "Levitating", artist: "Dua Lipa" },
    { id: 3, title: "Good 4 U", artist: "Olivia Rodrigo" },
    { id: 4, title: "Peaches", artist: "Justin Bieber" },
    { id: 5, title: "Save Your Tears", artist: "The Weeknd" },
    { id: 6, title: "Stay", artist: "The Kid LAROI & Justin Bieber" },
    { id: 7, title: "Montero (Call Me By Your Name)", artist: "Lil Nas X" },
    { id: 8, title: "Kiss Me More", artist: "Doja Cat ft. SZA" },
    { id: 9, title: "Industry Baby", artist: "Lil Nas X & Jack Harlow" },
    { id: 10, title: "Deja Vu", artist: "Olivia Rodrigo" }
  ];

  const handlePlayPause = (id) => {
    setIsPlaying(isPlaying === id ? null : id);
  };

  const handleLikeToggle = (id) => {
    if (likedTracks.includes(id)) {
      setLikedTracks(likedTracks.filter(trackId => trackId !== id));
    } else {
      setLikedTracks([...likedTracks, id]);
    }
  };

  return (
    <Box sx={{ textAlign: "center", margin: "20px" }}>
      <Typography variant="h4" className="heading">Your Recommended Songs</Typography>
      <Typography variant="body1" sx={{ marginBottom: 4 }}>Hit the like button if the song resonates with your mood!</Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {recommendations.map((track) => (
          <Grid item xs={12} sm={6} md={4} key={track.id}>
            <Card sx={{ backgroundColor: '#bbd0ff58', borderRadius: '10px' }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6">{track.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{track.artist}</Typography>
                </Box>
                <Box>
                  <IconButton onClick={() => handlePlayPause(track.id)}>
                    {isPlaying === track.id ? <PauseIcon /> : <PlayArrowIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleLikeToggle(track.id)}>
                    {likedTracks.includes(track.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MusicRecommendation;

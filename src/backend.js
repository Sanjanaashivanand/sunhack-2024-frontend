export const fetchUserProfile = async (token) => {
    console.log("TOKEN PASSED", token);
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
};

export const fetchPlaylist = async (token) => {
    console.log("TOKEN PASSED", token);
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const playlists = await response.json();
      const playlistIds = []
      playlists.items.forEach((data)=>{
        playlistIds.push(data.id)
      })
      console.log(JSON.stringify({'playlistIds' : playlistIds}))

      return playlists, playlistIds;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
};


export const getSongs = async (playlistIds, token) =>  {
    await fetch('http://127.0.0.1:5000/playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  
            playlistIds: playlistIds,
            token: token
        }),
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));
}

export const getMood = async (message) => {
  console.log("getting AI response")
  await fetch('http://localhost:5000/chatbot', {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(message)
              })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch((error) => console.error('Error:', error));

}
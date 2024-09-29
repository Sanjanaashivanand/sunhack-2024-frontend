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


/*
chatbotButton.addEventListener('click', function() {
  const inputData = {
    innerText: chatInput.innerTextValue
  };
  fetch('http://localhost:5000/chatbot', {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(inputData)})
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.error('There was a problem getting the chatbot response:', error);
        });
});
*/
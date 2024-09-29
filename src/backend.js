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
      console.log("Scopes: ", data.scope);  // Check scopes here if returned
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
      .then(response =>  response.initial_recommendations.json())
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));
}

export const getInitial = async (user_id) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/recommendation/initial', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id
      }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Log the raw response for debugging purposes
    console.log('Raw Response:', response);

    // Parse the response as JSON
    const data = await response.json();
    
    // Log the parsed JSON data
    console.log('Parsed Data:', data);

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const refreshRecommendations = async (user_id, feedback) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/recommendation/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        feedback: feedback
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Recommendations refreshed successfully:', data);
    return data; // Returning data in case you need to process it further
  } catch (error) {
    console.error('Error refreshing recommendations:', error);
    throw error; // Rethrowing the error if you need to handle it in the caller
  }
};



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
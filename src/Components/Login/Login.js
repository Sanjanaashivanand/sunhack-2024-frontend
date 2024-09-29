import React, {useState, useEffect} from 'react'
import './Login.css'
import spotifyLogo from '../../Assets/spotify-logo-240.png'
import { useNavigate } from 'react-router-dom';

function Login() {
  const CLIENT_ID = "ff957f1fb4f54a01a7252b40571c96e4";
  const CLIENT_SECRET = "e901e33fc5754d2a883bccb7cbd91e18";
  const REDIRECT_URI = "http://localhost:3000";  
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = "user-read-private user-read-email playlist-read-private";  

  const [token, setToken] = useState("");
  const navigate = useNavigate();  // Hook for programmatic navigation

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
    console.log(hash)
      token = hash.substring(1)
        .split("&")
        .find(elem => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
      navigate("/dashboard");
    } else {
      setToken(token);  // Set token if it exists in localStorage
    }
  }, [navigate]);  // Run useEffect only when 'navigate' changes

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

    return (
        <div className="Login">
            <div className="login-page">
                <h1>Spotify React</h1>
                <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
                {!token ?
                    <button className='login-button'><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scopes=${SCOPES}`}>Login
                        to Spotify</a></button>
                    : <button className='login-button' onClick={logout}>Logout</button>}
            </div>
        </div>
    )
}

export default Login;

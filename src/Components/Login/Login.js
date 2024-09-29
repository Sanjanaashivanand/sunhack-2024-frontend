import React, { useState, useEffect } from 'react'
import './Login.css'
import spotifyLogo from '../../Assets/spotify-logo-240.png'



function Login() {
    const CLIENT_ID = "181e3f2477f14d68a0b880b607b0e366"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    return (
        <div className="Login">
            <div className="login-page">
                <h1>Spotify React</h1>
                <img src={spotifyLogo} alt="Spotify Logo" className="spotify-logo" />
                {!token ?
                    <button><a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a></button>
                    : <button onClick={logout}>Logout</button>}
            </div>
        </div>
    )
}

export default Login

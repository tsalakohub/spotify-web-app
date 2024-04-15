'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const REDIRECT_URI = "http://localhost:3000/";
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SCOPES = ["user-read-email", "user-read-private"];
const RESPONSE_TYPE = "token";
const ALBUM_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=25";
const CLIENT_SECRET = process.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;


export function SpotifyComponent() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

            window.location.hash = "";
            window.localStorage.setItem("token", token);
        }

        setToken(token);
    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };
    
    return (
        <div>
            {!token ?
                <a 
                    href={LOGIN_URL} 
                    id="signInButton"
                    className="group rounded-lg border border-solid px-5 py-4 transition-colors bg-white text-black hover:border-white hover:bg-gray-50 hover:text-black hover:dark:border-neutral-700 animate-pulse"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get Started By Logging In
                </a>
                : <button 
                    onClick={logout}
                    id="signOutButton"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Logout
                </button>}
        </div>
    );
}

export const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
export const LOGIN_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}`;

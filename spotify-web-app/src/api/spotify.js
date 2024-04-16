'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const REDIRECT_URI = "http://localhost:3000/";
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SCOPES = ["user-read-email", "user-read-private", "user-read-recently-played",];
const RESPONSE_TYPE = "token";
const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
const SPACE_DELIMITER = "%20";
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
};

export function SpotifyComponent() {
    const router = useRouter();

    const [token, setToken] = useState("");

    useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);

          setToken(access_token);
        }
    });

    const handleLogin = () => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
        router.push("/grid");
    };
    
    const handleLogout = () => {
        setToken("");
        window.localStorage.removeItem("token");
        router.push("/grid");
    };

    return (
        <div>
            {/* <SpotifyGetAlbums /> */}
            {!token ? (
                <a
                    onClick={handleLogin}
                    id="signInButton"
                    className="group rounded-lg border border-solid px-5 py-4 transition-colors bg-white text-black hover:border-white hover:bg-gray-50 hover:text-black hover:dark:border-neutral-700 animate-pulse"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Get Started By Logging In
                </a>
            ) : (
                <Link href="/grid">
                Explore your Pixel Grid
              </Link>
            )}
        </div>
    );
}


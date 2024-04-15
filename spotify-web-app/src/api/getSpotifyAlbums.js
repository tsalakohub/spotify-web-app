import React, { useEffect, useState } from "react";
import axios from "axios";

const ALBUM_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=25";

const SpotifyGetAlbums = () => {
  const [token, setToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);

  const handleGetAlbums = () => {
    axios
      .get(ALBUM_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setAlbums(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleGetAlbums}>Get Albums</button>
      {albums.map((album) => (
        <div key={album.track.album.id}>
          <img src={album.track.album.images[0].url} alt={album.track.album.name} />
        </div>
      ))}
    </>
  );
};

export default SpotifyGetAlbums;

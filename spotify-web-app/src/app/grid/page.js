"use client"

import React, { useState, useEffect } from 'react';
import { MusicNotes } from '@/components/MusicNotes';
import Link from 'next/link';
import '@/app/albumgrid.css'; // Import the CSS file
import axios from "axios";
const ALBUM_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";


const AlbumGrid = () => {
  const [gridSize, setGridSize] = useState(5);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const fetchAlbums = () => {
      axios.get(ALBUM_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        const albums = response.data.items;
        const newCells = albums.map((album, index) => ({
          id: index,
          title: album.track.album.name,
          coverUrl: album.track.album.images[0].url
        }));
        setCells(newCells);
      })
      .catch(error => {
        console.log(error);
      });
    };

    fetchAlbums();
  }, []);

  const handleGridSizeChange = (e) => {
    const newSize = Math.min(10, Math.max(1, parseInt(e.target.value, 10)));
    setGridSize(newSize);
  
    const fetchAlbums = () => {
      axios.get(ALBUM_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      })
      .then(response => {
        const albums = response.data.items;
        const newCells = albums.map((album, index) => ({
          id: index,
          title: album.track.album.name,
          coverUrl: album.track.album.images[0].url
        }));
        setCells(newCells.slice(0, newSize * newSize)); // Update cells with new size
      })
      .catch(error => {
        console.log(error);
      });
    };
  
    fetchAlbums();
  };
  

  return (
    <div className="album-grid-container">
       <Link href="/">
       <MusicNotes count={15} />
        </Link>
      <h1 style={{ color: 'white' }}>Your Top Albums</h1>
      <div className="label-input-container">
        <label htmlFor="grid-size-input" className="grid-size-label">Enter a Dimension:</label>
        <input
          id="grid-size-input"
          type="number"
          min="1"
          max="5"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="grid-size-input"
        />
      </div>
      <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {cells.map(cell => (
          <div key={cell.id} className="grid-cell">
            <div className="square-wrapper">
              <img src={cell.coverUrl} alt={cell.title} className="square-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlbumGrid;
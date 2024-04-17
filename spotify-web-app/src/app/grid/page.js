"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '@/app/albumgrid.css'; // Import the CSS file
import axios from "axios";
import html2canvas from 'html2canvas';

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
          coverUrl: album.track.album.images[0].url,
          spotifyLink: album.track.external_urls.spotify
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
    const newSize = Math.min(10, Math.max(1, parseInt(e.target.value, 6)));
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
          coverUrl: album.track.album.images[0].url,
          spotifyLink: album.track.external_urls.spotify
        }));
        setCells(newCells.slice(0, newSize * newSize)); // Update cells with new size
      })
      .catch(error => {
        console.log(error);
      });
    };
  
    fetchAlbums();
  };

  const randomizeGrid = () => {
    const shuffledCells = [...cells].sort(() => Math.random() - 0.5);
    setCells(shuffledCells);
  };

  const downloadGrid = () => {
    const gridContainer = document.querySelector('.grid-container'); // Ensure this matches your actual grid container's class
    if (gridContainer) {
      html2canvas(gridContainer, {
        scale: 1,
        useCORS: true
      }).then(canvas => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'Your-Top-Albums.png'; 
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link); 
      }).catch(err => {
        console.error('Error downloading the grid: ', err);
      });
    } else {
      console.error('Grid container not found');
    }
  };
    
  return (
    <div className="album-grid-container" style={{ position: 'relative' }}>
    <h1 style={{ color: 'white', position: 'relative', zIndex: 10 }}>Your Top Albums</h1>
    <div className="label-input-container">
      <label htmlFor="grid-size-input" className="grid-size-label">Enter a Dimension:</label>
      <input
        id="grid-size-input"
        type="number"
        min="1"
        max="6"
        value={gridSize}
        onChange={handleGridSizeChange}
        className="grid-size-input"
      />
      <button onClick={randomizeGrid} className="randomize-button">Randomize</button>
      <button onClick={downloadGrid} className="randomize-button">Download Grid</button>
    </div>
    <div id="capture" className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
      {cells.map(cell => (
        <div key={cell.id} className="grid-cell" style={{ maxWidth: `var(--cell-size)` }}>
          <div className="square-wrapper">
            <a href={cell.spotifyLink} target="_blank" rel="noopener noreferrer">
              <img src={cell.coverUrl} alt={cell.title} className="square-image" />
            </a>
          </div>
        </div>
      ))}
  </div>
</div>
  );
};

export default AlbumGrid;
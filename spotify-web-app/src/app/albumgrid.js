"use client"
import React, { useState, useEffect } from 'react';
import '../app/albumgrid.css'; // Import the CSS file

const AlbumGrid = () => {
  const [gridSize, setGridSize] = useState(5);
  const [cells, setCells] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      const newCells = Array.from({ length: gridSize * gridSize }, (_, index) => {
        const width = Math.floor(window.innerWidth / gridSize);
        const height = Math.floor(window.innerHeight / gridSize);
        return {
          id: index,
          title: `Cell ${index + 1}`,
          coverUrl: `https://picsum.photos/${width}/${height}?random=${index}`
        };
      });
      setCells(newCells);
    };

    fetchImages(); // Call fetchImages on component mount and gridSize change
  }, [gridSize]);

  const handleGridSizeChange = (e) => {
    const newSize = Math.min(10, Math.max(1, parseInt(e.target.value, 10)));
    setGridSize(newSize);
  };

  const randomizeImages = () => {
    setCells(cells.map(cell => ({
      ...cell,
      coverUrl: `https://picsum.photos/${Math.floor(window.innerWidth / gridSize)}/${Math.floor(window.innerHeight / gridSize)}?random=${Math.floor(Math.random() * 1000)}`
    })));
  };

  return (
    <div className="album-grid-container">
      <h1 style={{ color: 'white' }}>Your Top Spotify Albums</h1>
      <div className="label-input-container">
        <label htmlFor="grid-size-input" className="grid-size-label">Enter a Dimension:</label>
        <input
          id="grid-size-input"
          type="number"
          min="1"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="grid-size-input"
        />
        <button onClick={randomizeImages} className="randomize-button">Randomize Pictures</button>
      </div>
      <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {cells.map(cell => (
          <div key={cell.id} className="grid-cell">
            <img src={cell.coverUrl} alt={cell.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AlbumGrid;
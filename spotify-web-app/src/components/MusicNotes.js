import { useState, useEffect } from 'react';

export const MusicNotes = ({ count = 10 }) => {
    const [notes, setNotes] = useState([]);
  
    useEffect(() => {
      const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16); // Function to generate random hex color
      setNotes(Array.from({ length: count }, (_, index) => ({
        id: index,
        delay: `${Math.random() * 7}s`, // Randomize delay up to 7 seconds
        left: `${Math.random() * 100}vw`, // Randomize starting position across the viewport width
        color: randomColor(), // Generate random color for each note
      })));
    }, [count]);
  
    return (
      <div className="music-notes-container">
        {notes.map((note) => (
          <span
            key={note.id}
            className="music-note"
            style={{
              animationDelay: note.delay,
              left: note.left,
              color: note.color, // Apply the generated random color
            }}
          >
            &#9835; {/* This is a musical note symbol */}
          </span>
        ))}
      </div>
    );
  };
"use client";
import Image from 'next/image';
import styles from '../app/pageStyle.css'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';


// MusicNotes Component
const MusicNotes = ({ count = 10 }) => {
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

// Main Home Component
export default function Home() {
  const textColors = [
    '#FF355E', // Radical Red
    '#FF6EFF', // Shocking Pink
    '#FFFF66', // Laser Lemon
    '#66FF66', // Screamin' Green
    '#50BFE6', // Blu
    '#FF00CC', // Purple Pizzazz
    '#FF6037', // Outrageous Orange
    '#FF9933', // Neon Carrot
    '#CCFF00', // Electric Lime
    '#AAF0D1', // Magic Mint
    '#FF5050', // Coral Red
    '#FFD700', // Gold (Retained for its vibrancy)
    '#00CCFF', // Sky Blue
    '#FA5B3D', // Sunset Orange
    '#FF0099', // Magenta
  ];
  
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const message = "Diiscover Your Music Palette";

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setCurrentColorIndex((currentIndex) => (currentIndex + 1) % textColors.length);
    }, 2000);

    return () => clearInterval(colorInterval);
  }, [textColors.length]);

  useEffect(() => {
    setDisplayText(""); // Reset the display text when the component mounts or the message changes
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < message.length) {
        setDisplayText((prev) => {
          const nextChar = message[charIndex];
          if (typeof nextChar !== 'undefined') {
            return prev + nextChar;
          }
          return prev;
        });
        charIndex++;
      } else {
        clearInterval(typingInterval); // Clear interval when the end of the message is reached
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [message]);

  const currentColor = textColors[currentColorIndex];

  return (
    <main className={`${styles.landingPage} flex flex-col items-center justify-center min-h-screen p-4`} style={{ backgroundColor: '#000' }}>
      <MusicNotes count={15} /> {/* You can adjust the count as needed */}
      <section className={`${styles.heroSection} text-center`}>
        <h1 style={{ color: currentColor, transition: 'color 0.5s' }} className="text-6xl font-bold mt-5">
          {displayText}
        </h1>
        <p className="text-md mt-4 text-white">
          Visualize your Spotify favorites in a beautiful color palette.
        </p>
      </section>
      <section className={`${styles.featuresSection} mt-10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className={`${styles.featureCard} p-6`}>
            <h2 className="text-2xl font-semibold text-white">Interactive Experience</h2>
            <p>Engage with your music in a whole new way.</p>
          </div>
          <div className={`${styles.featureCard} p-6`}>
            <h2 className="text-2xl font-semibold">Share with Friends</h2>
            <p>Show off your unique music taste with easily shareable visuals.</p>
          </div>
        </div>
      </section>
      <section className={`${styles.pulseAnimation} mt-12`}>
        <a 
        // place holder, need to figure out the path to the login page. 
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-solid px-5 py-4 transition-colors bg-white text-black hover:border-white hover:bg-gray-50 hover:text-black hover:dark:border-neutral-700 animate-pulse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started By Logging In
        </a>
      </section>
    </main>
  );
}
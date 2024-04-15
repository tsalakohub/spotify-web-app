"use client";

import styles from '@/app/pageStyle.css'; 
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MusicNotes } from '@/components/MusicNotes';

// Main Home Component
const page = () =>  {
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
  const message = "Opps, Something Went Wrong";

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
        </p>
      </section>
      <section className={`${styles.featuresSection} mt-10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          <div className={`${styles.featureCard} p-6`}>
          </div>
          <div className={`${styles.featureCard} p-6`}>
          </div>
        </div>
      </section>
      <section className={`${styles.pulseAnimation} mt-12`}>
        <Link href="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default page;
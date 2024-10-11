// components/RotatingText.tsx

import React, { useState, useEffect } from 'react';

const RotatingText: React.FC = () => {
  const baseText = "Join the most ";
  const eventText = " event of the year!";

  // Array of synonyms for the word "exciting"
  const synonyms: string[] = ["EXCITING", "INNOVATIVE", "THRILLING", "REMARKABLE"];
  
  const [currentSynonymIndex, setCurrentSynonymIndex] = useState<number>(0);
  const [displayedSynonym, setDisplayedSynonym] = useState<string>(synonyms[0]);

  useEffect(() => {
    let typingIndex = 0;
    const currentSynonym = synonyms[currentSynonymIndex];
    const typingSpeed = 100; // Speed of typing effect
  

    const typeInterval = setInterval(() => {
      if (typingIndex < currentSynonym.length) {
        setDisplayedSynonym((currentSynonym.substring(0, typingIndex + 1)));
        typingIndex++;
      } else {
        clearInterval(typeInterval); // Stop typing effect
        setTimeout(() => {
          // Prepare to switch to the next synonym after a delay
          setCurrentSynonymIndex((prevIndex) => (prevIndex + 1) % synonyms.length);
        }, 2000);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval); // Cleanup on unmount
  }, [currentSynonymIndex]);

  return (
    <div style={{ fontSize: '2rem', textAlign: 'center' }}>
      <h1>
        {baseText}
        <span className="synonym p-1.5 mx-0.5 rounded-md font-sixtyfour text-blue-600 font-bold">{displayedSynonym}</span>
        <p className='md:inline'>{eventText} </p>
      </h1>
      <style jsx>{`
        .synonym {
          display: inline-block; /* Keep it inline */
          
           /* Optional styling for emphasis */
          transition: color 0.3s ease-in-out; /* Smooth color transition */
        }m
      `}</style>
    </div>
  );
};

export default RotatingText;

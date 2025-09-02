import { useEffect, useState } from 'react';
import './attention.css';

const pegatinas = [
  '/img/pegatinas/1.png',
  '/img/pegatinas/2.png',
  '/img/pegatinas/3.png'
];

const generateRandomPosition = () => ({
  top: `${Math.floor(Math.random() * 80)}%`,
  left: `${Math.floor(Math.random() * 80)}%`
});

const AttentionImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * pegatinas.length);
            const nueva = {
              src: pegatinas[randomIndex],
              id: `${Date.now()}-${i}`,
              style: generateRandomPosition()
            };
            setImages(prev => [...prev, nueva]);
          }, i * 1000); // 🕒 1 segundo entre cada una
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <>
      {images.map((img) => (
        <img
          key={img.id}
          src={img.src}
          className="attention-img"
          style={{
            top: img.style.top,
            left: img.style.left
          }}
          alt="pegatina"
        />
      ))}
    </>
  );
};

export default AttentionImages;

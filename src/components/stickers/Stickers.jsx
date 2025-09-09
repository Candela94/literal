import { useEffect, useState } from 'react';
import './stickers.css';

export const StickersAttention = () => {
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [visibleStickers, setVisibleStickers] = useState([]);
  const [stickerIndex, setStickerIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);

  const stickers = [
    '/img/pegatinas/1.png',
    '/img/pegatinas/2.png',
    '/img/pegatinas/3.png'
  ];

  // Detectar cambios de visibilidad de la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      console.log('🔄 Cambio de visibilidad detectado:', {
        'document.hidden': document.hidden,
        'document.visibilityState': document.visibilityState,
        'página visible': visible
      });
      setIsPageVisible(visible);
    };

    // También detectar blur/focus de la ventana como respaldo
    const handleWindowBlur = () => {
      console.log('🌫️ Window blur - página probablemente oculta');
      setIsPageVisible(false);
    };

    const handleWindowFocus = () => {
      console.log('✨ Window focus - página probablemente visible');
      setIsPageVisible(true);
    };

    // Verificar estado inicial
    console.log('🔍 Estado inicial:', {
      'document.hidden': document.hidden,
      'document.visibilityState': document.visibilityState,
      'página inicialmente visible': !document.hidden
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, []);

  // Efecto para mostrar pegatinas cuando el usuario no está viendo la página
  useEffect(() => {
    let interval;

    if (!isPageVisible) {
      console.log('🚀 Página oculta - iniciando pegatinas');
      
      // Reiniciar estado
      setVisibleStickers([]);
      setStickerIndex(0);
      
      // Mostrar primera pegatina después de un pequeño delay
      const startTimeout = setTimeout(() => {
        console.log('📌 Mostrando primera pegatina');
        setVisibleStickers([0]);
      }, 500);

      // Continuar con las siguientes pegatinas
      interval = setInterval(() => {
        setStickerIndex(prev => {
          const nextIndex = prev + 1;
          console.log('⏰ Timer - siguiente índice:', nextIndex);
          
          if (nextIndex < stickers.length) {
            // Añadir siguiente pegatina
            console.log('➕ Añadiendo pegatina:', nextIndex);
            setVisibleStickers(current => [...current, nextIndex]);
            return nextIndex;
          } else if (nextIndex < stickers.length * 2) {
            // Fase de eliminación: quitar pegatinas una por una
            const removeIndex = nextIndex - stickers.length;
            console.log('➖ Quitando pegatina con índice:', removeIndex);
            setVisibleStickers(current => {
              const newStickers = current.filter(stickerIdx => stickerIdx !== removeIndex);
              console.log('🗑️ Pegatinas después de quitar:', newStickers);
              return newStickers;
            });
            return nextIndex;
          } else {
            // Reiniciar ciclo completo
            console.log('🔄 Reiniciando ciclo');
            setCycleCount(count => count + 1);
            setVisibleStickers([0]); // Empezar solo con la primera
            return 0;
          }
        });
      }, 3000);

      return () => {
        clearTimeout(startTimeout);
        if (interval) clearInterval(interval);
      };
    } else {
      console.log('👋 Página visible - limpiando pegatinas');
      // Usuario regresó - limpiar todo
      setVisibleStickers([]);
      setStickerIndex(0);
    }
  }, [isPageVisible, stickers.length]);

  const getRandomPosition = (index) => {
    const positions = [
      { top: '20%', left: '15%', rotate: '-15deg' },//negra
      { top: '45%', right: '15%', rotate: '0deg' }, //gris
      { top: '70%', left: '15%', rotate: '-10deg' }, //azul
    ];
    return positions[index] || positions[0];
  };

  return (
    <div className="stickers-container">
      {visibleStickers.map((stickerIdx) => {
        const position = getRandomPosition(stickerIdx);
        
        return (
          <div
            key={`${cycleCount}-${stickerIdx}`}
            className="sticker-item"
            style={{
              ...position,
              '--rotation': position.rotate,
            }}
          >
            <div className="sticker-shadow"></div>
            <div className="sticker-content">
              <img
                src={stickers[stickerIdx]}
                alt={`Pegatina ${stickerIdx + 1}`}
                className="sticker-image"
              />
              <div className="sticker-shine"></div>
            </div>
            <div className="sticker-blob"></div>
          </div>
        );
      })}
    </div>
  );
};
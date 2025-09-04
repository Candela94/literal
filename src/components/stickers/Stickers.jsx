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

  // ✅ DEBUG: Logs para ver qué está pasando
  useEffect(() => {
    console.log('🔍 DEBUG - Estado actual:', {
      isPageVisible,
      visibleStickers,
      stickerIndex,
      cycleCount
    });
  }, [isPageVisible, visibleStickers, stickerIndex, cycleCount]);

  // Detectar cambios de visibilidad de la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      console.log('👁️ Cambio de visibilidad:', visible ? 'VISIBLE' : 'OCULTO');
      setIsPageVisible(visible);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Efecto para mostrar pegatinas cuando el usuario no está viendo la página
  useEffect(() => {
    let interval;

    if (!isPageVisible) {
      console.log('🚀 Usuario se fue - iniciando pegatinas');
      
      // Empezar inmediatamente con la primera pegatina
      setTimeout(() => {
        console.log('📌 Mostrando primera pegatina');
        setVisibleStickers([0]);
        setStickerIndex(1);
      }, 100);

      // Mostrar pegatinas una por una cada 3 segundos
      interval = setInterval(() => {
        setStickerIndex(prev => {
          console.log('⏰ Timer - índice actual:', prev);
          
          if (prev < stickers.length) {
            console.log('➕ Añadiendo pegatina:', prev);
            setVisibleStickers(current => [...current, prev]);
            return prev + 1;
          } else {
            console.log('🔄 Reiniciando ciclo');
            setVisibleStickers([]);
            setCycleCount(count => count + 1);
            setTimeout(() => {
              setVisibleStickers([0]);
            }, 500);
            return 1;
          }
        });
      }, 3000);
    } else {
      console.log('👋 Usuario regresó - limpiando pegatinas');
      setVisibleStickers([]);
      setStickerIndex(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPageVisible, stickers.length]);

  const getRandomPosition = (index) => {
    const positions = [
      { top: '20%', left: '15%', rotate: '-15deg' },
      { top: '60%', right: '20%', rotate: '20deg' },
      { top: '40%', left: '50%', rotate: '-10deg' },
    ];
    return positions[index] || positions[0];
  };

  // ✅ DEBUG: Función para manejar errores de carga de imagen
  const handleImageError = (stickerIdx) => {
    console.error('❌ Error cargando imagen:', stickers[stickerIdx]);
  };

  const handleImageLoad = (stickerIdx) => {
    console.log('✅ Imagen cargada correctamente:', stickers[stickerIdx]);
  };

  return (
    <>
      {/* ✅ DEBUG: Mostrar estado actual */}
      <div style={{ 
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        background: 'black', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 10000
      }}>
        Estado: {isPageVisible ? '👀 Visible' : '👋 Oculto'}<br/>
        Pegatinas: {visibleStickers.length}<br/>
        Índice: {stickerIndex}<br/>
        Ciclo: {cycleCount}<br/>
        {/* ✅ Botón para probar manualmente */}
        <button 
          onClick={() => {
            console.log('🧪 Prueba manual - cambiando estado');
            setIsPageVisible(!isPageVisible);
          }}
          style={{
            marginTop: '5px',
            padding: '5px',
            fontSize: '10px',
            cursor: 'pointer'
          }}
        >
          🧪 Probar efecto
        </button>
      </div>

      <div className="stickers-container">
        {visibleStickers.map((stickerIdx) => {
          const position = getRandomPosition(stickerIdx);
          console.log('🎨 Renderizando pegatina:', stickerIdx, 'en posición:', position);
          
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
                  onError={() => handleImageError(stickerIdx)}
                  onLoad={() => handleImageLoad(stickerIdx)}
                />
                <div className="sticker-shine"></div>
              </div>
              <div className="sticker-blob"></div>
            </div>
          );
        })}
      </div>
    </>
  );
};
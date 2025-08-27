import { useEffect, useState } from 'react';
import './cookies.css';

const GA_ID = 'G-RSPCQEP31C';

const loadGA = (id) => {
  if (!window.gtag) {
    const scriptOne = document.createElement('script');
    scriptOne.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    scriptOne.async = true;
    document.head.appendChild(scriptOne);

    const scriptTwo = document.createElement('script');
    scriptTwo.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `;
    document.head.appendChild(scriptTwo);
  }
};

export const Cookies = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    console.log("Cookies renderizado");
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      setShowBanner(true);
    } else if (accepted === 'true') {
      loadGA(GA_ID);
    }
  }, []);

  const handleAccept = () => {
    console.log("✅ Has aceptado las cookies");
    localStorage.setItem('cookies-accepted', 'true');
    setShowBanner(false);
    loadGA(GA_ID);
  };

  const handleReject = () => {
    console.log("❌ Has rechazado las cookies");
    localStorage.setItem('cookies-accepted', 'false');
    setShowBanner(false);
    // No se carga GA
  };

  if (!showBanner) return null;

  console.log("Mostrando el banner");

  return (

    
    <div className="Card-cookies">

    
      <div className="Card-mensajeBtn">
        <p className="Card-mensaje texto-cookie# delay-1#">
          EN LITERAL UTILIZAMOS COOKIES PARA OFRECERTE UNA MEJOR EXPERIENCIA Y MEJORAR TU NAVEGACIÓN.
        </p>
        <button className="Btn-close texto-cookie## delay-1##" onClick={handleReject}>X</button>
      </div>
      <div className="Card-mensajeImg">
      <button className="Card-btnLeer texto-cookie delay-2">LEER MÁS</button>

      
        <img src="/img/literal-cookies.png" alt="cookies" className="Cookies-imagen" />
        </div>
     

      <div className="Card-buttons">
        <button className="Btn texto###-cookie delay###-3" onClick={handleAccept}>ACEPTAR</button>
       
        <button className="Btn texto###-cookie delay###-5" style={{color:'grey'}}>POLÍTICA DE COOKIES</button>
      </div>
    </div>
  );
};
 
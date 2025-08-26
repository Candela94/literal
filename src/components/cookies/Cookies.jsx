import { useEffect, useState } from 'react';
import './cookies.css';

const GA_ID = 'G-D4EM52Q7XJ';

const loadGA = (id) => {


    if (!window.gtag) {


        // Script para cargar gtag (gtag es una función que utiliza Google para enviar datos)

        const scriptOne = document.createElement('script');
        scriptOne.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;

        scriptOne.async = true; 
        document.head.appendChild(scriptOne);

        // Script para configurar gtag

        const scriptTwo = document.createElement('script');


        //Script que inicializa la configuración de GA este cargada
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

        const accepted = localStorage.getItem('cookies-accepted'); 


        if (!accepted) {
            setShowBanner(true);
        }


    }, []);




    const handleAccept = () => {

        localStorage.setItem('cookies-accepted', 'true');

        setShowBanner(false);


        // Cargar Google Analytics cuando el usuario acepta
        loadGA(GA_ID);
    };





    const handleClose = () => {



        localStorage.setItem('cookies-accepted', 'true');
        setShowBanner(false);



        // También cargar GA al cerrar (asumiendo que cerrar = aceptar)
        loadGA(GA_ID);
    };






    useEffect(() => {

        const accepted = localStorage.getItem('cookies-accepted');
        if (accepted === 'true') {

            loadGA(GA_ID); //Si las cookies han sido aceptadas, cargamos GA

        }

    }, []);






    if (!showBanner) return null;

    return (
        <div className="Card-cookies">
            <div className="Card-mensajeBtn">

                <p className="Card-mensaje">
                    
                    EN LITERAL UTILIZAMOS COOKIES PARA OFRECERTE UNA MEJOR EXPERIENCIA Y MEJORAR TU NAVEGACIÓN.
                    
                </p>

                <button className="Btn-close" onClick={handleClose}>x</button>

            </div>
            
            <button className="Card-btnLeer">LEER MÁS</button>
            
            <div className="Card-buttons">
                <button className="Btn" onClick={handleAccept}>ACEPTAR</button>
                <button className="Btn">POLÍTICA DE COOKIES</button>
            </div>
        </div>
    );
};
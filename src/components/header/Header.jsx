import './header.css';
import { useState, useRef, useEffect,  } from 'react';
import { CardIG } from '../cards/Cards';
import { useCart } from '../../context/CartContext';
import { Manifiesto } from '../manifiesto/Manifiesto';
import { NavLink } from 'react-router';

import { useNavigate } from 'react-router';
import { CarritoMenu } from '../cartmenu/CartMenu';

import Shuffle from '../suffle/Suffle';


export const Header = () => {
    const { cartItems } = useCart();
    const totalCantidad = cartItems.reduce((total, item) => total + item.quantity, 0);
  
    const [manifiesto, setManifiesto] = useState(false);
    const manifiestoRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


    const [opened, setOpened] = useState(false)

    const navigate = useNavigate();



    const handleCarritoClick = () => {
      if (isMobile) {
        navigate("/carrito");
      } else {
        setOpened(prev => !prev); 
      }
    };

  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (manifiesto && manifiestoRef.current && !manifiestoRef.current.contains(e.target)) {
          setManifiesto(false);
        }
      };
  
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [manifiesto]);




    return (
      <>
        <header className="Header">
          <NavLink to="/">
            <div className="TituloCompleto">
              <h1 className="Titulo">LA WEB DE</h1>
              <img src="/img/logo.png" alt="logo" className="Logo" />
            </div>
          </NavLink>
  
          <nav className="Header-nav">
            <CardIG />
            <ul className="Header-ul">
              <li className="Header-li " onClick={() => setManifiesto(prev => !prev)}><Shuffle
  text="MANIFIESTO"
  shuffleDirection="right"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={false}
  triggerOnHover={true}
  respectReducedMotion={true}
/></li>
              
                <li className="Header-li " onClick={handleCarritoClick}><Shuffle
  text={`CARRITO (${totalCantidad})`}
  shuffleDirection="right"
  duration={0.3}
  animationMode="evenodd"
  shuffleTimes={1}
  ease="power3.out"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={false}
  triggerOnHover={true}
  respectReducedMotion={true}
/></li>
            
            </ul>
          </nav>
        </header>
  
        {manifiesto && <Manifiesto ref={manifiestoRef} />}
        {!isMobile && <CarritoMenu opened={opened} onClose={() => setOpened(false)} />}      </>
    );
  };











export const HeaderSmall = () => {


    const { cartItems } = useCart();
    const totalCantidad = cartItems.reduce((total, item) => total + item.quantity, 0);


    const navigate = useNavigate();
    const [manifiesto, setManifiesto] = useState(false);
    const manifiestoRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


    
    const handleCarritoClick = () => {
      if (isMobile) {
        navigate("/carrito");
      } else {
        navigate("/carrito/desk");
      }

    }
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);




  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (manifiesto && manifiestoRef.current && !manifiestoRef.current.contains(e.target)) {
          setManifiesto(false);
        }
      };





  
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [manifiesto]);
  





    return (
      <>
        <header className="HeaderSmall">
          <NavLink to="/">
            <div className="TituloCompletoSmall">
              <h1 className="TituloSmall">LA WEB DE</h1>
              <img src="/img/logo.png" alt="logo" className="LogoSmall" />
            </div>
          </NavLink>
  
          <nav className="Header-navSmall">
         
            <ul className="Header-ulSmall">
              <li className="Header-liSmall texto delay-header1" onClick={() => setManifiesto(prev => !prev)}>MANIFIESTO</li>
             
                <li className="Header-liSmall texto delay-header2" onClick={handleCarritoClick}>CARRITO({totalCantidad})</li>
             
            </ul>
          </nav>
        </header>
  
        {manifiesto && <Manifiesto ref={manifiestoRef} />}
      </>
    );
  };













export const HeaderCarrito = () => {

    const { cartItems } = useCart();

    const totalCantidad = cartItems.reduce((total, item) => total + item.quantity, 0);


    return (


        <header className='Header-carrito'>

            <div className="Titulo-logo-carrito">

                <h1 className="Titulo-logo">
                    TU CARRITO <img src="/img/logo.png" alt="logo" className="Logo-header" /> 
                    <span className="Titulo-cantidad">({totalCantidad})</span>
                </h1>


            </div>


           <NavLink to='/'>VOLVER</NavLink>


        </header>
    )




}





export const HeaderCarritoDesk = ({onClose}) => {

  const { cartItems } = useCart();

  const totalCantidad = cartItems.reduce((total, item) => total + item.quantity, 0);


  return (


      <header className='Header-carritoDesk'>

          <div className="Titulo-logo-carrito">

              <h1 className="Titulo-logo">
                  TU CARRITO <img src="/img/logo.png" alt="logo" className="Logo-header" /> 
                  <span className="Titulo-cantidad">({totalCantidad})</span>
              </h1>


          </div>


         <button style={{cursor:'pointer'}} onClick={onClose}>CERRAR</button>


      </header>
  )




}
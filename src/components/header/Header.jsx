import './header.css';
import { useState, useRef, useEffect } from 'react';
import { CardIG } from '../cards/Cards';
import { useCart } from '../../context/CartContext';
import { Manifiesto } from '../manifiesto/Manifiesto';
import { NavLink } from 'react-router';

export const Header = () => {


    const { cartItems } = useCart();
    const totalCantidad = cartItems.reduce((total, item) => total + item.quantity, 0);

    const [manifiesto, setManifiesto] = useState(false);
    const manifiestoRef = useRef(null);





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

                <NavLink to='/'> <div className="Titulo-logo">
                    <h1 className="Titulo">LA WEB DE</h1>
                    <img src="/img/logo.png" alt="logo" className="Logo" />
                </div></NavLink>

                <nav className="Header-nav">
                    <CardIG />

                    <ul className="Header-ul">
                        <li className="Header-li texto delay-header1" onClick={() => setManifiesto(prev => !prev)}>MANIFIESTO</li>
                        <NavLink to='/carrito'><li className="Header-li texto delay-header2">CARRITO({totalCantidad})</li></NavLink>
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
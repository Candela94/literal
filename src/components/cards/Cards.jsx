


import './cards.css'
import { NavLink } from 'react-router';
import { FaArrowRightLong } from "react-icons/fa6";
import { useCart } from '../../context/CartContext';
import Shuffle from '../suffle/Suffle'





export const CardIG = () => {


    return (
        <>


            <div className="Card-IG ">
                <p className="Card-IGtxt">LITERALMENTE TODO EL COTILLEO EN IG</p>
                <NavLink to='https://www.instagram.com/literal_____/' target="_blank"
                >

                    <Shuffle
                        text={<span className="IG-link"><svg width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.8612 6.62404C29.1591 6.32618 29.1591 5.84326 28.8612 5.5454L24.0074 0.691529C23.7095 0.393672 23.2266 0.393672 22.9287 0.691529C22.6309 0.989387 22.6309 1.47231 22.9287 1.77017L27.2433 6.08472L22.9287 10.3993C22.6309 10.6971 22.6309 11.18 22.9287 11.4779C23.2266 11.7758 23.7095 11.7758 24.0074 11.4779L28.8612 6.62404ZM0.101562 6.08472V6.84743H28.3219V6.08472V5.322H0.101562V6.08472Z" fill="black" />
                        </svg>

                            <span className="IG-linkTxt">@LITERAL_____</span>
                        </span>}
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
                    />

                </NavLink>
            </div>






        </>
    );
}







export const CardProducto = ({ producto }) => {





    return (

        <>


            <NavLink to={`product/${producto._id}`} className='CardProducto'>


                <div className="CardProducto-img">

                    <img src={producto.portada} alt={producto.nombre} className="Card-imagen img-base" />
                    <img
                        src={producto.hover}
                        alt={producto.nombre}
                        className="Card-imagen img-hover"
                    />

                </div>

                <div className="Texto-txt">

                    <p className="Info">{producto.nombre} {producto.precio}€</p>
                </div>

            </NavLink>



        </>
    );
}





export const CardCarrito = ({ item }) => {


    const { removeFromCart, incrementQty, decrementQty, } = useCart();



    return (


        <div className="Cart">


            <img src={item.portada} alt={item.nombre} className="Cart-img" />

            <div className="Cart-info">


                <div className="Cart-detalle">


                    <div className="Datos-eliminar">

                        <div className="Nombre-precio">
                            <h4 className='Cart-nombre'>{item.nombre}</h4>
                            <p className='Cart-precio'> {item.precio} €</p>
                        </div>



                        <p className='Cart-eliminar'
                            onClick={() => removeFromCart(item._id)}>ELIMINAR</p>


                    </div>






                </div>

                <div className="controladores">


                    {item.quantity > 1 ? (

                        <button className="Cart-btn" onClick={() => decrementQty(item._id)} aria-label="Restar">
                            –
                        </button>
                    ) : (
                        // opcional: placeholder para evitar “saltos” de layout
                        <span style={{ width: 32, display: 'inline-block' }} />
                    )}

                    <p className="Q">  {item.quantity} </p>



                    <button className="Cart-btn" onClick={() => incrementQty(item._id)} aria-label="Sumar">
                        +
                    </button>
                </div>


            </div>


        </div>


    )




}
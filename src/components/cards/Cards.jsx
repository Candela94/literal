


import './cards.css'
import { NavLink } from 'react-router';
import { FaArrowRightLong } from "react-icons/fa6";






export const CardIG = () => {


    return (
        <>


            <div className="Card-IG">
                <p className="Card-IGtxt">LITERALMENTE TODO EL COTILLEO EN IG</p>
                <NavLink to='https://www.instagram.com/literal_____/' >
                    <span className="IG-link"><svg width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.8612 6.62404C29.1591 6.32618 29.1591 5.84326 28.8612 5.5454L24.0074 0.691529C23.7095 0.393672 23.2266 0.393672 22.9287 0.691529C22.6309 0.989387 22.6309 1.47231 22.9287 1.77017L27.2433 6.08472L22.9287 10.3993C22.6309 10.6971 22.6309 11.18 22.9287 11.4779C23.2266 11.7758 23.7095 11.7758 24.0074 11.4779L28.8612 6.62404ZM0.101562 6.08472V6.84743H28.3219V6.08472V5.322H0.101562V6.08472Z" fill="black" />
                    </svg>

                        <p className="IG-linkTxt">@LITERAL_____</p>
                    </span>
                </NavLink>
            </div>






        </>
    );
}







export const CardProducto = ({producto}) => {


   


    return (  

        <>


<NavLink to={`product/${producto._id}`} className='CardProducto'>
   

            <div className="CardProducto-img">

                <img src={producto.portada} alt={producto.nombre} className="Card-imagen" />
                
            </div>

         

                <p className="Info">{producto.nombre} {producto.precio}€</p>

           
      </NavLink>
        

        
        </>
    );
}